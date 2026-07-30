# ============================================
# K.V.R Control Plane Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Control Plane Upgrade"



$path = ".\src\control"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "Control folder ready"



# ============================================
# Agent Manager
# ============================================

$agentManager = @"
import { Injectable } from '@nestjs/common';

import { AgentService } from '../agent/agent.service';



@Injectable()
export class AgentManager {



constructor(

private readonly agent:AgentService

){}



execute(
input:any
)
{

return this.agent.execute(input);

}



status()
{

return {

agent:'ready'

};

}


}
"@


Set-Content `
-Path ".\src\control\agent.manager.ts" `
-Value $agentManager `
-Encoding UTF8


Write-Host "[CREATE] agent.manager.ts"



# ============================================
# Runtime Manager
# ============================================

$runtimeManager = @"
import { Injectable } from '@nestjs/common';

import { RuntimeService } from '../runtime/runtime.service';



@Injectable()
export class RuntimeManager {



constructor(

private readonly runtime:RuntimeService

){}




status()
{

return {

runtime:'active'

};

}



}
"@


Set-Content `
-Path ".\src\control\runtime.manager.ts" `
-Value $runtimeManager `
-Encoding UTF8


Write-Host "[CREATE] runtime.manager.ts"



# ============================================
# Command Center
# ============================================

$center = @"
import { Injectable } from '@nestjs/common';



@Injectable()
export class CommandCenter {



overview()
{

return {

system:'KVR',

status:'online',

timestamp:new Date()

};


}


}
"@


Set-Content `
-Path ".\src\control\command.center.ts" `
-Value $center `
-Encoding UTF8


Write-Host "[CREATE] command.center.ts"



# ============================================
# Control Controller
# ============================================

$controller = @"
import { Controller, Get } from '@nestjs/common';

import { CommandCenter } from './command.center';

import { AgentManager } from './agent.manager';

import { RuntimeManager } from './runtime.manager';



@Controller('control')
export class ControlController {



constructor(

private readonly center:CommandCenter,

private readonly agent:AgentManager,

private readonly runtime:RuntimeManager

){}



@Get('status')
status()
{

return {

system:this.center.overview(),

agent:this.agent.status(),

runtime:this.runtime.status()

};

}



}
"@


Set-Content `
-Path ".\src\control\control.controller.ts" `
-Value $controller `
-Encoding UTF8


Write-Host "[CREATE] control.controller.ts"



# ============================================
# Control Module
# ============================================

$module = @"
import { Module } from '@nestjs/common';


import { AgentModule } from '../agent/agent.module';

import { RuntimeModule } from '../runtime/runtime.module';



import { AgentManager } from './agent.manager';

import { RuntimeManager } from './runtime.manager';

import { CommandCenter } from './command.center';

import { ControlController } from './control.controller';



@Module({

imports:[

AgentModule,

RuntimeModule

],


controllers:[

ControlController

],


providers:[

AgentManager,

RuntimeManager,

CommandCenter

],


exports:[

CommandCenter

]

})
export class ControlModule {}
"@


Set-Content `
-Path ".\src\control\control.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[CREATE] control.module.ts"



# ============================================
# Register App Module
# ============================================

$app = ".\src\app.module.ts"


$content = Get-Content $app -Raw


if($content -notmatch "ControlModule")
{

$content = $content.Replace(

"import { SystemModule } from './system/system.module';",

"import { SystemModule } from './system/system.module';`nimport { ControlModule } from './control/control.module';"

)


$content = $content.Replace(

"SystemModule,",

"SystemModule,`n    ControlModule,"

)


Set-Content `
-Path $app `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] app.module.ts"

}



Log "Control Plane completed"



Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R CONTROL PLANE READY "
Write-Host "============================================"