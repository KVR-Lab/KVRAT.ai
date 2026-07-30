import { Module } from "@nestjs/common";

import { ReasoningModule } from "./reasoning/reasoning.module";
import { ToolModule } from "./tools/tool.module";
import { LlmModule } from "./llm/llm.module";

@Module({
imports:[
ReasoningModule,
ToolModule,
LlmModule
],
exports:[
ReasoningModule,
ToolModule,
LlmModule
]
})
export class CoreModule{}
