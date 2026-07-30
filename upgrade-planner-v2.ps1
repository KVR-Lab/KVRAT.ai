$Root = "D:\kvr-core"
$Planner = Join-Path $Root "src\planner"

@'
import { Injectable } from "@nestjs/common";

@Injectable()
export class PlannerService {

    private queue:any[] = [];

    async next(){

        if(this.queue.length===0){
            return null;
        }

        return this.queue.shift();

    }

    plan(command:any){

        const plan=this.createPlan(command);

        this.queue.push(plan);

        return plan;

    }

    private createPlan(command:any){

        const text=(command?.toString() ?? "").toLowerCase();

        const steps:any[]=[];

        if(text.includes("module")){

            steps.push({
                action:"write",
                file:"workspace/output/module.txt",
                content:"Module Generated"
            });

        }

        if(text.includes("service")){

            steps.push({
                action:"write",
                file:"workspace/output/service.txt",
                content:"Service Generated"
            });

        }

        if(text.includes("controller")){

            steps.push({
                action:"write",
                file:"workspace/output/controller.txt",
                content:"Controller Generated"
            });

        }

        if(steps.length===0){

            steps.push({
                action:"write",
                file:"workspace/output/task.txt",
                content:JSON.stringify(command,null,2)
            });

        }

        return{

            id:Date.now().toString(),

            command,

            steps,

            createdAt:new Date(),

            status:"pending"

        };

    }

}
'@ | Set-Content "$Planner\planner.service.ts"

Write-Host ""
Write-Host "===================================" -ForegroundColor Green
Write-Host "Planner V2 Installed Successfully" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green