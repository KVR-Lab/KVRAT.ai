$ErrorActionPreference="Stop"

$Root=(Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Set-Location $Root

function Step([string]$Name,[scriptblock]$Action){
    Write-Host ""
    Write-Host "[STEP] $Name" -ForegroundColor Cyan
    & $Action
    if($LASTEXITCODE -ne 0){
        throw "$Name failed."
    }
    Write-Host "[ OK ] $Name" -ForegroundColor Green
}

Step "Registry Builder" {
    powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "registry-builder.ps1")
}

Step "Index Builder" {
    powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot "index-builder.ps1")
}

Step "Nest Build" {
    pnpm build
}

Write-Host ""
Write-Host "====================================="
Write-Host "      KVR BUILD SUCCESS"
Write-Host "=====================================" -ForegroundColor Green
