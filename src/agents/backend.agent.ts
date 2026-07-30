import {Agent} from "../contracts/agent.contract";
import {Task} from "../contracts/task.contract";

export class BackendAgent implements Agent{

name="backend";

canHandle(task:Task){
return task.type=="backend";
}

async execute(task:Task){
return{
agent:this.name,
status:"done",
task
};
}

}
