# ============================================
# K.V.R Health Check Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


$file = ".\kvr-health.ps1"


$content = @'
# ============================================
# K.V.R Health Check
# ============================================

Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R SYSTEM HEALTH CHECK "
Write-Host "============================================"
Write-Host ""


$checks = @(
    "src/kernel",
    "src/runtime",
    "src/agent",
    "src/memory",
    "src/knowledge",
    "src/ai",
    "src/planner",
    "src/executor",
    "src/storage",
    "src/monitor",
    "src/scheduler",
    "src/orchestrator",
    "src/bootstrap"
)


foreach($item in $checks)
{

if(Test-Path ".\$item")
{
    Write-Host "[ OK ] $item"
}
else
{
    Write-Host "[MISS] $item"
}

}


Write-Host ""

Write-Host "Build test:"
Write-Host "Run: pnpm build"

Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R HEALTH CHECK COMPLETE "
Write-Host "============================================"
'@


Set-Content `
-Path $file `
-Value $content `
-Encoding UTF8


Write-Host "[CREATE] kvr-health.ps1"
