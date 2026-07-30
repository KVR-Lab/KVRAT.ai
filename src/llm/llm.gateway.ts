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
