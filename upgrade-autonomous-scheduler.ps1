# ============================================
# K.V.R Autonomous Scheduler Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Autonomous Scheduler Upgrade"



$path = ".\src\scheduler"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "Scheduler folder ready"



# ============================================
# Task Queue
# ============================================

$queue = @"
import { Injectable } from '@nestjs/common';



@Injectable()
export class TaskQueue {



private tasks:any[] = [];



push(
task:any
)
{

this.tasks.push(task);

}




next()
{

return this.tasks.shift();

}




all()
{

return this.tasks;

}



}
"@


Set-Content `
-Path ".\src\scheduler\task.queue.ts" `
-Value $queue `
-Encoding UTF8


Write-Host "[CREATE] task.queue.ts"



# ============================================
# Scheduler Service
# ============================================

$scheduler = @"
import { Injectable } from '@nestjs/common';

import { TaskQueue } from './task.queue';

import { AgentService } from '../agent/agent.service';



@Injectable()
export class SchedulerService {



constructor(

private readonly queue:TaskQueue,

private readonly agent:AgentService

){}





schedule(
task:any
)
{

this.queue.push(task);


return {

status:'queued',

task

};


}




run()
{

const task = this.queue.next();


if(!task)
{

return {

status:'empty'

};

}



return this.agent.execute(task);



}



}
"@


Set-Content `
-Path ".\src\scheduler\scheduler.service.ts" `
-Value $scheduler `
-Encoding UTF8


Write-Host "[CREATE] scheduler.service.ts"



# ============================================
# Scheduler Module
# ============================================

$module = @"
import { Module } from '@nestjs/common';


import { AgentModule } from '../agent/agent.module';


import { TaskQueue } from './task.queue';

import { SchedulerService } from './scheduler.service';



@Module({

imports:[

AgentModule

],


providers:[

TaskQueue,

SchedulerService

],


exports:[

SchedulerService

]


})
export class SchedulerModule {}
"@


Set-Content `
-Path ".\src\scheduler\scheduler.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[CREATE] scheduler.module.ts"



# ============================================
# Register App Module
# ============================================

$app = ".\src\app.module.ts"


$content = Get-Content $app -Raw


if($content -notmatch "SchedulerModule")
{

$content = $content.Replace(

"import { MonitorModule } from './monitor/monitor.module';",

"import { MonitorModule } from './monitor/monitor.module';`nimport { SchedulerModule } from './scheduler/scheduler.module';"

)


$content = $content.Replace(

"MonitorModule,",

"MonitorModule,`n    SchedulerModule,"

)


Set-Content `
-Path $app `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] app.module.ts"

}



Log "Autonomous Scheduler completed"



Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R AUTONOMOUS SCHEDULER READY "
Write-Host "============================================"