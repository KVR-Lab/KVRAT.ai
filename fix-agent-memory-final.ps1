$ErrorActionPreference="Stop"

Write-Host "[KVR] Final Agent Memory Repair"


# Add Memory compatibility methods

$memory = ".\src\memory\memory.service.ts"

$content = Get-Content $memory -Raw


if($content -notmatch "store\(")
{
$content += @"

store(item:any)
{
return item;
}


getAll()
{
return [];
}

"@

Set-Content $memory $content -Encoding UTF8
}


# Remove bad injection from agent service

$agent = ".\src\agent\agent.service.ts"

$content = Get-Content $agent -Raw


$content = $content -replace "this\.agentMemory\.remember\(task, result\);",""


Set-Content $agent $content -Encoding UTF8



Write-Host "[KVR] Final Agent Memory Repair Done"