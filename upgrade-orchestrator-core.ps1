# ============================================
# K.V.R Autonomous Orchestrator Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Orchestrator Core Upgrade"



$path = ".\src\orchestrator"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "Orchestrator folder ready"



# ============================================
# Lifecycle Service
# ============================================

$lifecycle = @"
import { Injectable } from '@nestjs/common';

import { HealthService } from '../system/health.service';

import { SchedulerService } from '../scheduler/scheduler.service';



@Injectable()
export class LifecycleService {



constructor(

private readonly health:HealthService,

private readonly scheduler:SchedulerService

){}





boot()
{

const health = this.health.check();



return {

status:'booted',

health,

scheduler:'ready',

time:new Date()

};


}




startTask(
task:any
)
{

return this.scheduler.schedule(task);

}



}
"@


Set-Content `
-Path ".\src\orchestrator\lifecycle.service.ts" `
-Value $lifecycle `
-Encoding UTF8


Write-Host "[CREATE] lifecycle.service.ts"



# ============================================
# Orchestrator Service
# ============================================

$service = @"
import { Injectable } from '@nestjs/common';

import { LifecycleService } from './lifecycle.service';



@Injectable()
export class OrchestratorService {



constructor(

private readonly lifecycle:LifecycleService

){}





start()
{

return this.lifecycle.boot();

}



run(
task:any
)
{

return this.lifecycle.startTask(task);

}



}
"@


Set-Content `
-Path ".\src\orchestrator\orchestrator.service.ts" `
-Value $service `
-Encoding UTF8


Write-Host "[CREATE] orchestrator.service.ts"



# ============================================
# Orchestrator Module
# ============================================

$module = @"
import { Module } from '@nestjs/common';


import { SystemModule } from '../system/system.module';

import { SchedulerModule } from '../scheduler/scheduler.module';



import { LifecycleService } from './lifecycle.service';

import { OrchestratorService } from './orchestrator.service';



@Module({

imports:[

SystemModule,

SchedulerModule

],


providers:[

LifecycleService,

OrchestratorService

],


exports:[

OrchestratorService

]


})
export class OrchestratorModule {}
"@


Set-Content `
-Path ".\src\orchestrator\orchestrator.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[CREATE] orchestrator.module.ts"



# ============================================
# Register App Module
# ============================================

$app = ".\src\app.module.ts"


$content = Get-Content $app -Raw


if($content -notmatch "OrchestratorModule")
{

$content = $content.Replace(

"import { SchedulerModule } from './scheduler/scheduler.module';",

"import { SchedulerModule } from './scheduler/scheduler.module';`nimport { OrchestratorModule } from './orchestrator/orchestrator.module';"

)


$content = $content.Replace(

"SchedulerModule,",

"SchedulerModule,`n    OrchestratorModule,"

)


Set-Content `
-Path $app `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] app.module.ts"

}



Log "Orchestrator Core completed"



Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R ORCHESTRATOR READY "
Write-Host "============================================"