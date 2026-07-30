$Root = "D:\kvr-core"
$LLM = Join-Path $Root "src\llm"
$Providers = Join-Path $LLM "providers"

New-Item -ItemType Directory -Force $Providers | Out-Null

# -----------------------------
# OpenAI Provider
# -----------------------------
@'
import { Injectable } from "@nestjs/common";
import { LlmProvider } from "../llm.provider";

@Injectable()
export class OpenAIProvider implements LlmProvider {

    async chat(prompt:string):Promise<any>{

        return {
            provider:"openai",
            prompt,
            message:"Not implemented"
        };

    }

}
'@ | Set-Content "$Providers\openai.provider.ts"

# -----------------------------
# Ollama Provider
# -----------------------------
@'
import { Injectable } from "@nestjs/common";
import { LlmProvider } from "../llm.provider";

@Injectable()
export class OllamaProvider implements LlmProvider {

    async chat(prompt:string):Promise<any>{

        return {
            provider:"ollama",
            prompt,
            message:"Not implemented"
        };

    }

}
'@ | Set-Content "$Providers\ollama.provider.ts"

# -----------------------------
# Claude Provider
# -----------------------------
@'
import { Injectable } from "@nestjs/common";
import { LlmProvider } from "../llm.provider";

@Injectable()
export class ClaudeProvider implements LlmProvider {

    async chat(prompt:string):Promise<any>{

        return {
            provider:"claude",
            prompt,
            message:"Not implemented"
        };

    }

}
'@ | Set-Content "$Providers\claude.provider.ts"

# -----------------------------
# Gemini Provider
# -----------------------------
@'
import { Injectable } from "@nestjs/common";
import { LlmProvider } from "../llm.provider";

@Injectable()
export class GeminiProvider implements LlmProvider {

    async chat(prompt:string):Promise<any>{

        return {
            provider:"gemini",
            prompt,
            message:"Not implemented"
        };

    }

}
'@ | Set-Content "$Providers\gemini.provider.ts"

# -----------------------------
# Factory
# -----------------------------
@'
import { Injectable } from "@nestjs/common";

import { OpenAIProvider } from "./providers/openai.provider";
import { OllamaProvider } from "./providers/ollama.provider";
import { ClaudeProvider } from "./providers/claude.provider";
import { GeminiProvider } from "./providers/gemini.provider";

@Injectable()
export class LlmFactory{

    constructor(

        private readonly openai:OpenAIProvider,
        private readonly ollama:OllamaProvider,
        private readonly claude:ClaudeProvider,
        private readonly gemini:GeminiProvider

    ){}

    get(name:string){

        switch(name.toLowerCase()){

            case "openai": return this.openai;
            case "ollama": return this.ollama;
            case "claude": return this.claude;
            case "gemini": return this.gemini;

            default:
                return this.ollama;

        }

    }

}
'@ | Set-Content "$LLM\llm.factory.ts"

# -----------------------------
# Gateway
# -----------------------------
@'
import { Injectable } from "@nestjs/common";
import { LlmFactory } from "./llm.factory";

@Injectable()
export class LlmGateway{

    constructor(
        private readonly factory:LlmFactory
    ){}

    async chat(provider:string,prompt:string){

        return this.factory.get(provider).chat(prompt);

    }

}
'@ | Set-Content "$LLM\llm.gateway.ts"

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "LLM V2 Generated Successfully" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green