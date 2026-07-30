import { Injectable } from '@nestjs/common';

import { ArchitectAgent } from '../agents/architect.agent';
import { BackendAgent } from '../agents/backend.agent';
import { FrontendAgent } from '../agents/frontend.agent';
import { DatabaseAgent } from '../agents/database.agent';
import { DevopsAgent } from '../agents/devops.agent';
import { AiAgent } from '../agents/ai.agent';

import { Task } from '../contracts/task.contract';

@Injectable()
export class OrchestratorService {
  constructor(
    private readonly architect: ArchitectAgent,
    private readonly backend: BackendAgent,
    private readonly frontend: FrontendAgent,
    private readonly database: DatabaseAgent,
    private readonly devops: DevopsAgent,
    private readonly ai: AiAgent,
  ) {}

  private get agents() {
    return [
      this.architect,
      this.backend,
      this.frontend,
      this.database,
      this.devops,
      this.ai,
    ];
  }

  async start() {
    return {
      status: 'started',
      agents: this.agents.length,
    };
  }

  async dispatch(task: Task) {
    const agent = this.agents.find((a) => a.canHandle(task));

    if (!agent) {
      return {
        status: 'no-agent',
        task,
      };
    }

    return await agent.execute(task);
  }
}