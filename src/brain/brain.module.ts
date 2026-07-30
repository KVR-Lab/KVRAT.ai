import { Module } from "@nestjs/common";

import { BrainService } from "./brain.service";

import { LlmModule } from "../llm/llm.module";
import { MemoryModule } from "../memory/memory.module";
import { KnowledgeModule } from "../knowledge/knowledge.module";

@Module({

    imports: [
        LlmModule,
        MemoryModule,
        KnowledgeModule
    ],

    providers: [
        BrainService
    ],

    exports: [
        BrainService
    ]

})
export class BrainModule {}