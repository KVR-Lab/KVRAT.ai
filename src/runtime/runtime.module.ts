import { Module } from "@nestjs/common";

import { RuntimeService } from "./runtime.service";
import { RuntimeLoop } from "./runtime.loop";

import { EventBus } from "../events/bus/event.bus";

import { PlannerModule } from "../planner/planner.module";
import { ExecutorModule } from "../executor/executor.module";
import { MemoryModule } from "../memory/memory.module";
import { AiModule } from "../ai/ai.module";
import { BrainModule } from "../brain/brain.module";
import { OrchestratorModule } from "../orchestrator/orchestrator.module";

@Module({
    imports: [
        PlannerModule,
        ExecutorModule,
        MemoryModule,
        AiModule,
        BrainModule,
        OrchestratorModule
    ],
    providers: [
        RuntimeService,
        RuntimeLoop,
        EventBus
    ],
    exports: [
        RuntimeService,
        RuntimeLoop
    ]
})
export class RuntimeModule {}