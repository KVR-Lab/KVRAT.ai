import { Module } from '@nestjs/common';

import { MemoryModule } from '../memory/memory.module';
import { ReasoningModule } from '../reasoning/reasoning.module';
import { PlannerModule } from '../planner/planner.module';
import { ToolModule } from '../tools/tool.module';
import { ExecutorModule } from '../executor/executor.module';
import { CommandModule } from '../command/command.module';
import { AiModule } from '../ai/ai.module';

import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { AgentPipeline } from './agent.pipeline';
import { AgentMemoryService } from './agent.memory.service';
import { AgentLoop } from './agent.loop';

@Module({
  imports: [
    MemoryModule,
    ReasoningModule,
    PlannerModule,
    ToolModule,
    ExecutorModule,
    CommandModule,
    AiModule,
  ],

  controllers: [
    AgentController,
  ],

  providers: [
    AgentService,
    AgentMemoryService,
    AgentPipeline,
    AgentLoop,
  ],

  exports: [
    AgentService,
    AgentPipeline,
    AgentLoop,
  ],
})
export class AgentModule {}