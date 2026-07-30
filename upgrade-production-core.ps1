# ============================================
# K.V.R Production Core Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Production Core Upgrade"



$path = ".\src\system"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "System folder ready"



# ============================================
# Logger Service
# ============================================

$logger = @"
import { Injectable } from '@nestjs/common';



@Injectable()
export class LoggerService {



log(
message:string
)
{

console.log(
'[KVR]',
message
);

}



error(
message:string
)
{

console.error(
'[KVR ERROR]',
message
);

}


}
"@


Set-Content `
-Path ".\src\system\logger.service.ts" `
-Value $logger `
-Encoding UTF8


Write-Host "[CREATE] logger.service.ts"



# ============================================
# Config Service
# ============================================

$config = @"
import { Injectable } from '@nestjs/common';



@Injectable()
export class ConfigService {



get(
key:string
)
{

return process.env[key];

}


}
"@


Set-Content `
-Path ".\src\system\config.service.ts" `
-Value $config `
-Encoding UTF8


Write-Host "[CREATE] config.service.ts"



# ============================================
# Health Service
# ============================================

$health = @"
import { Injectable } from '@nestjs/common';



@Injectable()
export class HealthService {



check()
{

return {

status:'ok',

service:'KVR-Core',

time:new Date()

};


}


}
"@


Set-Content `
-Path ".\src\system\health.service.ts" `
-Value $health `
-Encoding UTF8


Write-Host "[CREATE] health.service.ts"



# ============================================
# Diagnostics Service
# ============================================

$diag = @"
import { Injectable } from '@nestjs/common';



@Injectable()
export class DiagnosticsService {



report()
{

return {

runtime:true,

agent:true,

memory:true,

knowledge:true,

ai:true,

planner:true,

executor:true

};


}


}
"@


Set-Content `
-Path ".\src\system\diagnostics.service.ts" `
-Value $diag `
-Encoding UTF8


Write-Host "[CREATE] diagnostics.service.ts"



# ============================================
# System Module
# ============================================

$module = @"
import { Module } from '@nestjs/common';


import { LoggerService } from './logger.service';

import { ConfigService } from './config.service';

import { HealthService } from './health.service';

import { DiagnosticsService } from './diagnostics.service';



@Module({

providers:[

LoggerService,

ConfigService,

HealthService,

DiagnosticsService

],


exports:[

LoggerService,

ConfigService,

HealthService,

DiagnosticsService

]


})
export class SystemModule {}
"@


Set-Content `
-Path ".\src\system\system.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[CREATE] system.module.ts"



# ============================================
# Register In App Module
# ============================================

$app = ".\src\app.module.ts"


$content = Get-Content $app -Raw


if($content -notmatch "SystemModule")
{

$content = $content.Replace(

"import { AgentModule } from './agent/agent.module';",

"import { AgentModule } from './agent/agent.module';`nimport { SystemModule } from './system/system.module';"

)


$content = $content.Replace(

"AgentModule,",

"AgentModule,`n    SystemModule,"

)


Set-Content `
-Path $app `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] app.module.ts"

}



Log "Production Core Upgrade completed"



Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R PRODUCTION CORE READY "
Write-Host "============================================"