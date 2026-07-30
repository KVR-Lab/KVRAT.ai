$Root="D:\KVR-Core"

$folders=@(
"src\agents",
"src\orchestrator",
"src\llm",
"src\generator",
"src\runner",
"src\pipeline",
"src\tasks",
"src\contracts",
"src\spec"
)

foreach($f in $folders){
New-Item "$Root\$f" -ItemType Directory -Force|Out-Null
}

$files=@(
"src\contracts\agent.contract.ts",
"src\contracts\task.contract.ts",
"src\orchestrator\orchestrator.service.ts",
"src\agents\architect.agent.ts",
"src\agents\backend.agent.ts",
"src\agents\frontend.agent.ts",
"src\agents\database.agent.ts",
"src\agents\devops.agent.ts",
"src\agents\ai.agent.ts",
"src\llm\llm.gateway.ts",
"src\generator\generator.service.ts",
"src\runner\project.runner.ts",
"src\pipeline\pipeline.service.ts",
"src\tasks\task.queue.ts",
"src\spec\spec.loader.ts"
)

foreach($i in $files){
if(!(Test-Path "$Root\$i")){
New-Item "$Root\$i" -ItemType File|Out-Null
Write-Host "[OK] $i"
}
}

Write-Host ""
Write-Host "Agent SDK Ready"