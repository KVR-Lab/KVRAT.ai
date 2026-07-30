import { Module } from '@nestjs/common';

import { SystemModule } from '../system/system.module';
import { SchedulerModule } from '../scheduler/scheduler.module';

import { ArchitectAgent } from '../agents/architect.agent';
import { BackendAgent } from '../agents/backend.agent';
import { FrontendAgent } from '../agents/frontend.agent';
import { DatabaseAgent } from '../agents/database.agent';
import { DevopsAgent } from '../agents/devops.agent';
import { AiAgent } from '../agents/ai.agent';

import { LifecycleService } from './lifecycle.service';
import { OrchestratorService } from './orchestrator.service';

@Module({
  imports: [
    SystemModule,
    SchedulerModule,
  ],
  providers: [
    LifecycleService,
    OrchestratorService,

    ArchitectAgent,
    BackendAgent,
    FrontendAgent,
    DatabaseAgent,
    DevopsAgent,
    AiAgent,
  ],
  exports: [
    OrchestratorService,
  ],
})
export class OrchestratorModule {}