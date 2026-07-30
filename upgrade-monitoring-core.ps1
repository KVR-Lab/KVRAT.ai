# ============================================
# K.V.R Monitoring Core Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Monitoring Core Upgrade"



$path = ".\src\monitor"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "Monitor folder ready"



# ============================================
# Metrics Service
# ============================================

$metrics = @"
import { Injectable } from '@nestjs/common';



@Injectable()
export class MetricsService {



private metrics:any[] = [];



record(
name:string,
value:any
)
{

this.metrics.push({

name,

value,

time:new Date()

});

}



all()
{

return this.metrics;

}



}
"@


Set-Content `
-Path ".\src\monitor\metrics.service.ts" `
-Value $metrics `
-Encoding UTF8


Write-Host "[CREATE] metrics.service.ts"



# ============================================
# Monitor Service
# ============================================

$monitor = @"
import { Injectable } from '@nestjs/common';

import { MetricsService } from './metrics.service';



@Injectable()
export class MonitorService {



constructor(

private readonly metrics:MetricsService

){}




status()
{

const result = {

system:'KVR',

runtime:'active',

agent:'active',

memory:'ready',

storage:'ready',

time:new Date()

};



this.metrics.record(

'health.status',

result

);



return result;

}



}
"@


Set-Content `
-Path ".\src\monitor\monitor.service.ts" `
-Value $monitor `
-Encoding UTF8


Write-Host "[CREATE] monitor.service.ts"



# ============================================
# Monitor Controller
# ============================================

$controller = @"
import { Controller, Get } from '@nestjs/common';

import { MonitorService } from './monitor.service';



@Controller('monitor')
export class MonitorController {



constructor(

private readonly monitor:MonitorService

){}



@Get('status')
status()
{

return this.monitor.status();

}



}
"@


Set-Content `
-Path ".\src\monitor\monitor.controller.ts" `
-Value $controller `
-Encoding UTF8


Write-Host "[CREATE] monitor.controller.ts"



# ============================================
# Monitor Module
# ============================================

$module = @"
import { Module } from '@nestjs/common';


import { MetricsService } from './metrics.service';

import { MonitorService } from './monitor.service';

import { MonitorController } from './monitor.controller';



@Module({

controllers:[

MonitorController

],


providers:[

MetricsService,

MonitorService

],


exports:[

MonitorService,

MetricsService

]


})
export class MonitorModule {}
"@


Set-Content `
-Path ".\src\monitor\monitor.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[CREATE] monitor.module.ts"



# ============================================
# Register App Module
# ============================================

$app = ".\src\app.module.ts"


$content = Get-Content $app -Raw


if($content -notmatch "MonitorModule")
{

$content = $content.Replace(

"import { StorageModule } from './storage/storage.module';",

"import { StorageModule } from './storage/storage.module';`nimport { MonitorModule } from './monitor/monitor.module';"

)


$content = $content.Replace(

"StorageModule,",

"StorageModule,`n    MonitorModule,"

)


Set-Content `
-Path $app `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] app.module.ts"

}



Log "Monitoring Core completed"



Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R MONITORING READY "
Write-Host "============================================"