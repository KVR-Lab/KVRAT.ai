import { Injectable } from "@nestjs/common";
import { ExecutorService } from "../executor/executor.service";

@Injectable()
export class AgentLoop {

constructor(
private readonly executor: ExecutorService
){}


async run(plan:any){

const results:any[] = [];


for(const step of plan.steps){

const result =
await this.executor.execute(step);


results.push({
step,
result
});

}


return results;

}

}