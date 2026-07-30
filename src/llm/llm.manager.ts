import { Injectable } from "@nestjs/common";
import { LlmProvider } from "./llm.provider";

@Injectable()
export class LlmManager{

private provider:LlmProvider|null=null;

setProvider(provider:LlmProvider){
this.provider=provider;
}

async chat(prompt:string){

if(!this.provider){
return {error:"No provider configured"};
}

return this.provider.chat(prompt);

}

}
