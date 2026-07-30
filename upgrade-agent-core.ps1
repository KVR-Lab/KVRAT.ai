# ============================================
# K.V.R Agent Core Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Agent Core Generator"



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
# Agent Context
# ============================================

$context = @"
export interface AgentContext {


    input:any;


    memory:any[];


    knowledge:any[];


    decision?:any;


}
"@


Set-Content `
-Path ".\src\agent\agent.context.ts" `
-Value $context `
-Encoding UTF8


Write-Host "[CREATE] agent.context.ts"



# ============================================
# Agent Loop
# ============================================

$loop = @"
import { Injectable } from '@nestjs/common';

import { MemoryEngine } from '../memory/memory.engine';

import { KnowledgeEngine } from '../knowledge/knowledge.engine';

import { AiEngine } from '../ai/ai.engine';

import { PlannerEngine } from '../planner/planner.engine';

import { ExecutorEngine } from '../executor/executor.engine';



@Injectable()
export class AgentLoop {



constructor(

private readonly memory:MemoryEngine,

private readonly knowledge:KnowledgeEngine,

private readonly ai:AiEngine,

private readonly planner:PlannerEngine,

private readonly executor:ExecutorEngine

){}




run(
input:any
)
{


const memory = 
this.memory.context();



const knowledge =
this.knowledge.search(
JSON.stringify(input)
);



const decision =
this.ai.generate({

input,

memory,

knowledge

});



const plan =
this.planner.build(
decision
);



return this.executor.execute(
plan
);


}



}
"@


Set-Content `
-Path ".\src\agent\agent.loop.ts" `
-Value $loop `
-Encoding UTF8


Write-Host "[CREATE] agent.loop.ts"



# ============================================
# Agent Service
# ============================================

$service = @"
import { Injectable } from '@nestjs/common';

import { AgentLoop } from './agent.loop';



@Injectable()
export class AgentService {



constructor(
private readonly loop:AgentLoop
){}




execute(
input:any
)
{

return this.loop.run(input);

}



}
"@


Set-Content `
-Path ".\src\agent\agent.service.ts" `
-Value $service `
-Encoding UTF8


Write-Host "[CREATE] agent.service.ts"



# ============================================
# Agent Module
# ============================================

$module = @"
import { Module } from '@nestjs/common';


import { AgentService } from './agent.service';

import { AgentLoop } from './agent.loop';


import { MemoryModule } from '../memory/memory.module';

import { KnowledgeModule } from '../knowledge/knowledge.module';

import { AiModule } from '../ai/ai.module';

import { PlannerModule } from '../planner/planner.module';

import { ExecutorModule } from '../executor/executor.module';



@Module({

imports:[

MemoryModule,

KnowledgeModule,

AiModule,

PlannerModule,

ExecutorModule

],


providers:[

AgentService,

AgentLoop

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


Write-Host "[CREATE] agent.module.ts"



# ============================================
# Register Agent In App
# ============================================

$app = ".\src\app.module.ts"


$content = Get-Content $app -Raw


if($content -notmatch "AgentModule")
{


$content = $content.Replace(

"import { AiModule } from './ai/ai.module';",

"import { AiModule } from './ai/ai.module';`nimport { AgentModule } from './agent/agent.module';"

)



$content = $content.Replace(

"AiModule,",

"AiModule,`n    AgentModule,"

)



Set-Content `
-Path $app `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] app.module.ts"

}



Log "Agent Core Generator completed"

Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R AGENT CORE READY "
Write-Host "============================================"