import {Agent} from "../contracts/agent.contract";
import {Task} from "../contracts/task.contract";

export class FrontendAgent implements Agent{

name="frontend";

canHandle(task:Task){
return task.type=="frontend";
}

async execute(task:Task){
return{
agent:this.name,
status:"done",
task
};
}

}
