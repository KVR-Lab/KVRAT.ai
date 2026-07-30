import {Agent} from "../contracts/agent.contract";
import {Task} from "../contracts/task.contract";

export class DevopsAgent implements Agent{

name="devops";

canHandle(task:Task){
return task.type=="devops";
}

async execute(task:Task){
return{
agent:this.name,
status:"done",
task
};
}

}
