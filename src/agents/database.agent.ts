import {Agent} from "../contracts/agent.contract";
import {Task} from "../contracts/task.contract";

export class DatabaseAgent implements Agent{

name="database";

canHandle(task:Task){
return task.type=="database";
}

async execute(task:Task){
return{
agent:this.name,
status:"done",
task
};
}

}
