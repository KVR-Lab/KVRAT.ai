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
