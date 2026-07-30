# ============================================
# K.V.R Agent API Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Agent API Generator"



$path = ".\src\agent"


if(!(Test-Path $path))
{
    throw "Agent module not found"
}


Log "Agent module detected"



# ============================================
# Create Agent Controller
# ============================================

$controller = @"
import { Body, Controller, Post } from '@nestjs/common';

import { AgentService } from './agent.service';



@Controller('agent')
export class AgentController {



constructor(

private readonly agent:AgentService

){}




@Post('execute')
execute(

@Body() body:any

)
{

return this.agent.execute(

body

);

}



}
"@


Set-Content `
-Path ".\src\agent\agent.controller.ts" `
-Value $controller `
-Encoding UTF8


Write-Host "[CREATE] src/agent/agent.controller.ts"



# ============================================
# Update Agent Module
# ============================================

$module = ".\src\agent\agent.module.ts"


$content = Get-Content $module -Raw



if($content -notmatch "AgentController")
{


$content = $content.Replace(

"import { AgentLoop } from './agent.loop';",

"import { AgentLoop } from './agent.loop';`nimport { AgentController } from './agent.controller';"

)



$content = $content.Replace(

"providers:[",

"controllers:[`n`nAgentController`n],`n`nproviders:["

)



Set-Content `
-Path $module `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] agent.module.ts"

}



Log "Agent API Gateway completed"


Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R AGENT API READY "
Write-Host "============================================"