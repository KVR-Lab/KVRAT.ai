# ============================================
# K.V.R Planner Executor Connector
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Planner Executor Connector"


if(!(Test-Path ".\src\executor"))
{
    throw "Executor module not found"
}


if(!(Test-Path ".\src\planner\planner.engine.ts"))
{
    throw "Planner Engine not found"
}


Log "Planner and Executor detected"
# ============================================
# Create Executor Engine
# ============================================

Log "Creating Executor Engine..."


$engine = @"
import { Injectable } from '@nestjs/common';



@Injectable()
export class ExecutorEngine {



    execute(
        plan:any
    )
    {


        return {

            status:"completed",


            plan,


            result:

            "Execution completed by K.V.R Executor",


            executedAt:
            new Date()

        };


    }


}
"@


Set-Content `
-Path ".\src\executor\executor.engine.ts" `
-Value $engine `
-Encoding UTF8


Write-Host "[CREATE] src/executor/executor.engine.ts"


Log "Executor Engine ready"
# ============================================
# Update Runtime With Executor
# ============================================

Log "Updating Runtime Service..."


$file = ".\src\runtime\runtime.service.ts"


$content = Get-Content $file -Raw


$content = $content.Replace(

"import { PlannerEngine } from '../planner/planner.engine';",

"import { PlannerEngine } from '../planner/planner.engine';`nimport { ExecutorEngine } from '../executor/executor.engine';"

)


$content = $content.Replace(

"private readonly planner:PlannerEngine",

"private readonly planner:PlannerEngine,`n`n        private readonly executor:ExecutorEngine"

)


$content = $content.Replace(

"events.map(`n`n            event =>`n            this.planner.build(`n                event.payload`n            )`n`n        );",

"events.map(`n`n            event =>`n            this.executor.execute(`n                this.planner.build(`n                    event.payload`n                )`n            )`n`n        );"

)


Set-Content `
-Path $file `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] runtime.service.ts"


Log "Runtime connected to Executor"

# ============================================
# Update Executor Module
# ============================================

Log "Updating Executor Module..."


$module = @"
import { Module } from '@nestjs/common';

import { ExecutorEngine } from './executor.engine';


@Module({

    providers:[

        ExecutorEngine

    ],

    exports:[

        ExecutorEngine

    ]

})
export class ExecutorModule {}
"@


Set-Content `
-Path ".\src\executor\executor.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[UPDATED] src/executor/executor.module.ts"



# ============================================
# Update Runtime Module
# ============================================

Log "Updating Runtime Module..."


$runtime = ".\src\runtime\runtime.module.ts"


$content = Get-Content $runtime -Raw


if($content -notmatch "ExecutorModule")
{

$content = $content.Replace(

"import { PlannerModule } from '../planner/planner.module';",

"import { PlannerModule } from '../planner/planner.module';`nimport { ExecutorModule } from '../executor/executor.module';"

)


$content = $content.Replace(

"PlannerModule",

"PlannerModule,`n        ExecutorModule"

)


Set-Content `
-Path $runtime `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] runtime.module.ts"

}


Log "Planner Executor Connector completed"


































