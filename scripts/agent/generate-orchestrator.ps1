$Root="D:\KVR-Core"

@'
import { Injectable } from "@nestjs/common";
import { ArchitectAgent } from "../agents/architect.agent";
import { BackendAgent } from "../agents/backend.agent";
import { FrontendAgent } from "../agents/frontend.agent";
import { DatabaseAgent } from "../agents/database.agent";
import { DevopsAgent } from "../agents/devops.agent";
import { AiAgent } from "../agents/ai.agent";
import { Task } from "../contracts/task.contract";

@Injectable()
export class OrchestratorService{

    private readonly agents=[
        new ArchitectAgent(),
        new BackendAgent(),
        new FrontendAgent(),
        new DatabaseAgent(),
        new DevopsAgent(),
        new AiAgent()
    ];

    async dispatch(task:Task){

        const agent=this.agents.find(a=>a.canHandle(task));

        if(!agent){
            return{
                status:"no-agent",
                task
            };
        }

        return await agent.execute(task);

    }

}
'@ | Set-Content "$Root\src\orchestrator\orchestrator.service.ts"

Write-Host "[OK] orchestrator.service.ts"
Write-Host ""
Write-Host "Orchestrator Ready"