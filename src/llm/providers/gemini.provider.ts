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
