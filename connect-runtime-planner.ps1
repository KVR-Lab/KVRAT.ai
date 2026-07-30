# ============================================
# K.V.R Runtime Planner Connector
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Runtime Planner Connector"


if(!(Test-Path ".\src\planner\planner.engine.ts"))
{
    throw "Planner Engine not found"
}


if(!(Test-Path ".\src\runtime\runtime.service.ts"))
{
    throw "Runtime Service not found"
}


Log "Runtime and Planner detected"
# ============================================
# Update Runtime Service
# ============================================

Log "Updating Runtime Service..."


$service = @"
import { Injectable } from '@nestjs/common';

import { EventBus } from '../events/bus/event.bus';

import { PlannerEngine } from '../planner/planner.engine';



@Injectable()
export class RuntimeService {



    constructor(

        private readonly eventBus:EventBus,

        private readonly planner:PlannerEngine

    ){}



    process()
    {

        const events =
        this.eventBus.getEvents();



        const plans =
        events.map(

            event =>
            this.planner.build(
                event.payload
            )

        );



        return {

            status:"runtime.planning",

            events,

            plans

        };

    }


}
"@


Set-Content `
-Path ".\src\runtime\runtime.service.ts" `
-Value $service `
-Encoding UTF8


Write-Host "[UPDATED] src/runtime/runtime.service.ts"


Log "Runtime connected to Planner"
# ============================================
# Update Runtime Module Dependencies
# ============================================

Log "Updating Runtime Module..."


$module = @"
import { Module } from '@nestjs/common';


import { RuntimeService } from './runtime.service';

import { EventBus } from '../events/bus/event.bus';

import { PlannerModule } from '../planner/planner.module';



@Module({

    imports:[

        PlannerModule

    ],


    providers:[

        RuntimeService,

        EventBus

    ],


    exports:[

        RuntimeService

    ]

})
export class RuntimeModule {}
"@


Set-Content `
-Path ".\src\runtime\runtime.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[UPDATED] src/runtime/runtime.module.ts"


Log "Runtime Planner Connector completed"