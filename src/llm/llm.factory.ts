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
