# ============================================
# K.V.R Runtime Gateway Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Runtime Gateway Upgrade"



$path = ".\src\gateway"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "Gateway folder ready"



# ============================================
# Gateway Controller
# ============================================

$gateway = @"
import { Controller, Get } from '@nestjs/common';

import { CommandCenter } from '../control/command.center';



@Controller('gateway')
export class GatewayController {



constructor(

private readonly center:CommandCenter

){}



@Get('info')
info()
{

return this.center.overview();

}



}
"@


Set-Content `
-Path ".\src\gateway\gateway.controller.ts" `
-Value $gateway `
-Encoding UTF8


Write-Host "[CREATE] gateway.controller.ts"



# ============================================
# Health Controller
# ============================================

$health = @"
import { Controller, Get } from '@nestjs/common';

import { HealthService } from '../system/health.service';



@Controller('health')
export class HealthController {



constructor(

private readonly health:HealthService

){}



@Get()
check()
{

return this.health.check();

}



}
"@


Set-Content `
-Path ".\src\gateway\health.controller.ts" `
-Value $health `
-Encoding UTF8


Write-Host "[CREATE] health.controller.ts"



# ============================================
# Gateway Module
# ============================================

$module = @"
import { Module } from '@nestjs/common';


import { ControlModule } from '../control/control.module';

import { SystemModule } from '../system/system.module';


import { GatewayController } from './gateway.controller';

import { HealthController } from './health.controller';



@Module({

imports:[

ControlModule,

SystemModule

],


controllers:[

GatewayController,

HealthController

]


})
export class GatewayModule {}
"@


Set-Content `
-Path ".\src\gateway\gateway.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[CREATE] gateway.module.ts"



# ============================================
# Register App Module
# ============================================

$app = ".\src\app.module.ts"


$content = Get-Content $app -Raw


if($content -notmatch "GatewayModule")
{

$content = $content.Replace(

"import { ControlModule } from './control/control.module';",

"import { ControlModule } from './control/control.module';`nimport { GatewayModule } from './gateway/gateway.module';"

)


$content = $content.Replace(

"ControlModule,",

"ControlModule,`n    GatewayModule,"

)


Set-Content `
-Path $app `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] app.module.ts"

}



Log "Runtime Gateway completed"



Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R GATEWAY READY "
Write-Host "============================================"