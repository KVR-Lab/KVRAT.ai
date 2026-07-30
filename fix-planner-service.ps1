$File="D:\kvr-core\src\planner\planner.service.ts"

@'
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlannerService {

    private queue:any[] = [];

    async next(){

        if(this.queue.length === 0){
            return null;
        }

        return this.queue.shift();

    }


    plan(command:any){

        const plan = this.createPlan(command);

        this.queue.push(plan);

        return plan;

    }


    createPlan(command:any){

        return {

            command,

            steps:[

                {
                    action:"analyze",
                    status:"pending"
                },

                {
                    action:"execute",
                    status:"pending"
                }

            ],

            createdAt:new Date()

        };

    }

}
'@ | Set-Content $File -Encoding UTF8

Write-Host "Planner Service Fixed"