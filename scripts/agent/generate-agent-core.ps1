$Root="D:\KVR-Core"

@'
export interface Task{
    id:string;
    type:string;
    payload:any;
}
'@ | Set-Content "$Root\src\contracts\task.contract.ts"

@'
import {Task} from "./task.contract";

export interface Agent{
    name:string;
    canHandle(task:Task):boolean;
    execute(task:Task):Promise<any>;
}
'@ | Set-Content "$Root\src\contracts\agent.contract.ts"

$agents=@(
"architect",
"backend",
"frontend",
"database",
"devops",
"ai"
)

foreach($a in $agents){

@"
import {Agent} from "../contracts/agent.contract";
import {Task} from "../contracts/task.contract";

export class $($a.Substring(0,1).ToUpper()+$a.Substring(1))Agent implements Agent{

name="$a";

canHandle(task:Task){
return task.type=="$a";
}

async execute(task:Task){
return{
agent:this.name,
status:"done",
task
};
}

}
"@ | Set-Content "$Root\src\agents\$a.agent.ts"

Write-Host "[OK] $a.agent.ts"

}

Write-Host ""
Write-Host "Agent Core Ready"