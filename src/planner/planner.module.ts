import { Module } from '@nestjs/common';
import { KnowledgeModule } from '../knowledge/knowledge.module';

import { PlannerController } from './planner.controller';
import { PlannerService } from './planner.service';
import { PlannerEngine } from './planner.engine';

@Module({
  imports: [
    KnowledgeModule,
  ],

  controllers: [
    PlannerController,
  ],

  providers: [
    PlannerService,
    PlannerEngine,
  ],

  exports: [
    PlannerService,
    PlannerEngine,
  ],
})
export class PlannerModule {}