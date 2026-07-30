# ============================================
# K.V.R Planner Pipeline Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Planner Pipeline Generator"


$path = ".\src\planner"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "Planner folder ready"
# ============================================
# Create Planner Service
# ============================================

Log "Creating Planner Service..."


$service = @"
import { Injectable } from '@nestjs/common';



@Injectable()
export class PlannerService {



    createPlan(
        command:any
    )
    {


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


            createdAt:
            new Date()

        };

    }



}
"@


Set-Content `
-Path ".\src\planner\planner.service.ts" `
-Value $service `
-Encoding UTF8


Write-Host "[CREATE] src/planner/planner.service.ts"


Log "Planner Service ready"
# ============================================
# Create Planner Engine
# ============================================

Log "Creating Planner Engine..."


$engine = @"
import { Injectable } from '@nestjs/common';
import { PlannerService } from './planner.service';



@Injectable()
export class PlannerEngine {



    constructor(
        private readonly planner:PlannerService
    ){}



    build(
        command:any
    )
    {

        return this.planner.createPlan(command);

    }



}
"@


Set-Content `
-Path ".\src\planner\planner.engine.ts" `
-Value $engine `
-Encoding UTF8


Write-Host "[CREATE] src/planner/planner.engine.ts"


Log "Planner Engine ready"
# ============================================
# Update Planner Module
# ============================================

Log "Updating Planner Module..."


$module = @"
import { Module } from '@nestjs/common';


import { PlannerService } from './planner.service';

import { PlannerEngine } from './planner.engine';



@Module({

    providers:[

        PlannerService,

        PlannerEngine

    ],

    exports:[

        PlannerService,

        PlannerEngine

    ]

})
export class PlannerModule {}
"@


Set-Content `
-Path ".\src\planner\planner.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[UPDATED] src/planner/planner.module.ts"


Log "Planner Pipeline foundation ready"