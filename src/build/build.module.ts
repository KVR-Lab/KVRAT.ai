import { Module } from '@nestjs/common';
import { BuildController } from './build.controller';
import { BuildService } from './build.service';
import { BuildEngine } from './build.engine';
import { ProjectRunner } from "./project.runner";
import { BrainModule } from "../brain";
import { PlannerModule } from "../planner";
import { ExecutorModule } from "../executor";

@Module({
  controllers: [BuildController],
  providers: [
    BuildService,
    BuildEngine,
  ],
  exports: [
    BuildService,
    BuildEngine,
  ],
})
export class BuildModule {}