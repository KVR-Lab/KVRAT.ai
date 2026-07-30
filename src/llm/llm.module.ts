import { Module } from "@nestjs/common";

import { LlmManager } from "./llm.manager";
import { LlmFactory } from "./llm.factory";
import { LlmGateway } from "./llm.gateway";

import { OpenAIProvider } from "./providers/openai.provider";
import { OllamaProvider } from "./providers/ollama.provider";
import { ClaudeProvider } from "./providers/claude.provider";
import { GeminiProvider } from "./providers/gemini.provider";

@Module({
  providers: [
    LlmManager,
    OpenAIProvider,
    OllamaProvider,
    ClaudeProvider,
    GeminiProvider,
    LlmFactory,
    LlmGateway
  ],
  exports: [
    LlmManager,
    OpenAIProvider,
    OllamaProvider,
    ClaudeProvider,
    GeminiProvider,
    LlmFactory,
    LlmGateway
  ]
})
export class LlmModule {}
