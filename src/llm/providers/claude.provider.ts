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
