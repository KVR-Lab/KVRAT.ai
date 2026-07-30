import { Injectable } from '@nestjs/common';

import { ReasoningEngine } from '../reasoning/reasoning.engine';
import { PlannerService } from '../planner/planner.service';
import { ToolRouter } from '../tools/tool.router';
import { AgentMemoryService } from './agent.memory.service';
import { AgentLoop } from './agent.loop';
import { CommandService } from '../command/command.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class AgentPipeline {
  constructor(
    private readonly reasoning: ReasoningEngine,
    private readonly planner: PlannerService,
    private readonly tools: ToolRouter,
    private readonly memory: AgentMemoryService,
    private readonly loop: AgentLoop,
    private readonly commands: CommandService,
    private readonly ai: AiService,
  ) {}

  async execute(task: any) {
    const reasoning = await this.reasoning.reason(task);

    const prompt =
      typeof task === 'string'
        ? task
        : task?.message ??
          task?.command ??
          JSON.stringify(task);

    const aiDecision = await this.ai.process(prompt);

    const executionPlan = this.planner.plan(aiDecision);

    const executionResults =
      await this.loop.run(executionPlan);

    let toolResult: any = null;

    if (task?.tool) {
      toolResult = await this.tools.execute(
        task.tool,
        ...(task.args ?? []),
      );
    }

    let commandResult: any = null;

    if (task?.build) {
      commandResult = this.commands.build();
    } else if (task?.command === 'dev') {
      commandResult = this.commands.dev();
    } else if (task?.command === 'install') {
      commandResult = this.commands.install();
    } else if (task?.command === 'status') {
      commandResult = this.commands.gitStatus();
    }

    let shellResult: any = null;

    if (task?.shell) {
      shellResult = this.commands.powershell(task.shell);
    }

    const result = {
      status: 'completed',
      reasoning,
      aiDecision,
      executionPlan,
      executionResults,
      toolResult,
      commandResult,
      shellResult,
    };

    await this.memory.remember(task, result);

    return result;
  }
}