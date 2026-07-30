# ============================================
# K.V.R Bootstrap Sequence Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Bootstrap Sequence Upgrade"



$path = ".\src\bootstrap"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "Bootstrap folder ready"



# ============================================
# Startup Check
# ============================================

$check = @"
import { Injectable } from '@nestjs/common';

import { HealthService } from '../system/health.service';

import { DiagnosticsService } from '../system/diagnostics.service';



@Injectable()
export class StartupCheck {



constructor(

private readonly health:HealthService,

private readonly diagnostics:DiagnosticsService

){}



verify()
{

return {

health:

this.health.check(),


diagnostics:

this.diagnostics.report(),


ready:true

};


}


}
"@


Set-Content `
-Path ".\src\bootstrap\startup.check.ts" `
-Value $check `
-Encoding UTF8


Write-Host "[CREATE] startup.check.ts"



# ============================================
# Boot Service
# ============================================

$boot = @"
import { Injectable } from '@nestjs/common';

import { StartupCheck } from './startup.check';

import { OrchestratorService } from '../orchestrator/orchestrator.service';



@Injectable()
export class BootService {



constructor(

private readonly check:StartupCheck,

private readonly orchestrator:OrchestratorService

){}




start()
{

return {

system:

this.check.verify(),


orchestrator:

this.orchestrator.start(),


status:

'KVR ONLINE'


};


}



}
"@


Set-Content `
-Path ".\src\bootstrap\boot.service.ts" `
-Value $boot `
-Encoding UTF8


Write-Host "[CREATE] boot.service.ts"



# ============================================
# Bootstrap Module
# ============================================

$module = @"
import { Module } from '@nestjs/common';


import { SystemModule } from '../system/system.module';

import { OrchestratorModule } from '../orchestrator/orchestrator.module';



import { StartupCheck } from './startup.check';

import { BootService } from './boot.service';



@Module({

imports:[

SystemModule,

OrchestratorModule

],


providers:[

StartupCheck,

BootService

],


exports:[

BootService

]


})
export class BootstrapModule {}
"@


Set-Content `
-Path ".\src\bootstrap\bootstrap.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[CREATE] bootstrap.module.ts"



# ============================================
# Register App Module
# ============================================

$app = ".\src\app.module.ts"


$content = Get-Content $app -Raw


if($content -notmatch "BootstrapModule")
{

$content = $content.Replace(

"import { OrchestratorModule } from './orchestrator/orchestrator.module';",

"import { OrchestratorModule } from './orchestrator/orchestrator.module';`nimport { BootstrapModule } from './bootstrap/bootstrap.module';"

)


$content = $content.Replace(

"OrchestratorModule,",

"OrchestratorModule,`n    BootstrapModule,"

)


Set-Content `
-Path $app `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] app.module.ts"

}



Log "Bootstrap Sequence completed"



Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R BOOT SEQUENCE READY "
Write-Host "============================================"