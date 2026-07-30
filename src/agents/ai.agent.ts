import {Agent} from "../contracts/agent.contract";
import {Task} from "../contracts/task.contract";

export class AiAgent implements Agent{

name="ai";

canHandle(task:Task){
return task.type=="ai";
}

async execute(task:Task){
return{
agent:this.name,
status:"done",
task
};
}

}
