# ============================================
# K.V.R Fix Agent Memory Loop
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}



# Fix Memory Service compatibility

$memoryService = ".\src\memory\memory.service.ts"


if(Test-Path $memoryService)
{

$content = Get-Content $memoryService -Raw


if($content -notmatch "store")
{

$content += @"



// Agent Memory Compatibility

store(item:any)
{

return this.save(item);

}



getAll()
{

return this.all();

}

"@

Set-Content `
-Path $memoryService `
-Value $content `
-Encoding UTF8

Write-Host "[UPDATED] memory.service.ts"

}

}



# Fix Agent Memory Service

$agentMemory = @"
import { Injectable } from '@nestjs/common';

import { MemoryService } from '../memory/memory.service';



@Injectable()
export class AgentMemoryService {


constructor(

private readonly memory:MemoryService

){}



remember(

task:any,

result:any

)
{

return this.memory.store({

task,

result,

createdAt:new Date()

});

}



recall()
{

return this.memory.getAll();

}



}
"@


Set-Content `
-Path ".\src\agent\agent.memory.service.ts" `
-Value $agentMemory `
-Encoding UTF8


Write-Host "[UPDATED] agent.memory.service.ts"



# Fix Agent Module

$module = @"
import { Module } from '@nestjs/common';

import { MemoryModule } from '../memory/memory.module';

import { AgentService } from './agent.service';

import { AgentController } from './agent.controller';

import { AgentMemoryService } from './agent.memory.service';



@Module({

imports:[

MemoryModule

],


controllers:[

AgentController

],


providers:[

AgentService,

AgentMemoryService

],


exports:[

AgentService

]


})
export class AgentModule {}
"@


Set-Content `
-Path ".\src\agent\agent.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[UPDATED] agent.module.ts"



Log "Agent Memory Module fixed"


Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R AGENT MEMORY FIX READY "
Write-Host "============================================"