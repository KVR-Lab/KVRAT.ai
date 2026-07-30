# ============================================
# K.V.R Agent Memory Loop Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Agent Memory Loop Upgrade"



$path = ".\src\agent"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "Agent folder ready"



# ============================================
# Agent Memory Service
# ============================================

$memory = @"
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
-Value $memory `
-Encoding UTF8


Write-Host "[CREATE] agent.memory.service.ts"



# ============================================
# Update Agent Service
# ============================================

$agent = ".\src\agent\agent.service.ts"


if(Test-Path $agent)
{

$content = Get-Content $agent -Raw


if($content -notmatch "AgentMemoryService")
{

$content = $content.Replace(

"import { Injectable } from '@nestjs/common';",

"import { Injectable } from '@nestjs/common';`nimport { AgentMemoryService } from './agent.memory.service';"

)


$content = $content.Replace(

"constructor(",

"constructor(`nprivate readonly agentMemory:AgentMemoryService,"

)


$content = $content.Replace(

"return",

"this.agentMemory.remember(task, result);`n`nreturn"

)


Set-Content `
-Path $agent `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] agent.service.ts"

}

}



# ============================================
# Update Agent Module
# ============================================

$module = ".\src\agent\agent.module.ts"


if(Test-Path $module)
{

$content = Get-Content $module -Raw


if($content -notmatch "AgentMemoryService")
{

$content = $content.Replace(

"import { Module } from '@nestjs/common';",

"import { Module } from '@nestjs/common';`nimport { MemoryModule } from '../memory/memory.module';"

)


$content = $content.Replace(

"@Module({",

"@Module({`nimports:[MemoryModule],"

)


$content = $content.Replace(

"providers:[",

"providers:[`nAgentMemoryService,"

)


Set-Content `
-Path $module `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] agent.module.ts"

}

}



Log "Agent Memory Loop completed"



Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R AGENT MEMORY LOOP READY "
Write-Host "============================================"