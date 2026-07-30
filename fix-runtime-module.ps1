$file = ".\src\runtime\runtime.module.ts"


$content = @"
import { Module } from '@nestjs/common';


import { RuntimeService } from './runtime.service';

import { EventBus } from '../events/bus/event.bus';

import { PlannerModule } from '../planner/planner.module';

import { ExecutorModule } from '../executor/executor.module';



@Module({

    imports:[

        PlannerModule,

        ExecutorModule

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
-Path $file `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] runtime.module.ts"