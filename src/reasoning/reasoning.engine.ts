import { Injectable } from "@nestjs/common";
import { AiService } from "../ai/ai.service";

@Injectable()
export class ReasoningEngine {

constructor(
private readonly ai: AiService
){}


async reason(task:any){

const text =
typeof task === "string"
? task
: task?.task ?? "";


const result =
await this.ai.process(text);


return {

goal:text,

priority:"normal",

analysis:result,

steps:[
"Analyze request",
"Create plan",
"Execute plan",
"Store result"
],

createdAt:new Date().toISOString()

};

}

}