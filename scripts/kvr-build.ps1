# ============================================
# KVR Build System
# ============================================

$ErrorActionPreference = "Stop"

$Root = Split-Path $MyInvocation.MyCommand.Path -Parent
$Project = Resolve-Path (Join-Path $Root "..")

Set-Location $Project

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "         KVR BUILD SYSTEM" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

function Run-Step {

    param(
        [string]$Title,
        [scriptblock]$Action
    )

    Write-Host ""
    Write-Host "[STEP] $Title" -ForegroundColor Yellow

    try {

        & $Action

        if($LASTEXITCODE -ne 0){
            throw "Command failed with exit code $LASTEXITCODE"
        }

        Write-Host "[ OK ] $Title" -ForegroundColor Green

    }
    catch {

        Write-Host "[FAIL] $Title" -ForegroundColor Red
        Write-Host $_
        exit 1

    }

}

Run-Step "Registry Builder" {

    powershell -ExecutionPolicy Bypass `
        -File ".\scripts\registry-builder.ps1"

}

Run-Step "Index Builder" {

    powershell -ExecutionPolicy Bypass `
        -File ".\scripts\index-builder.ps1"

}

Run-Step "Nest Build" {

    pnpm build

}

Run-Step "Git Status" {

    git status --short

}

Write-Host ""
Write-Host "===========================================" -ForegroundColor Green
Write-Host "        BUILD FINISHED SUCCESSFULLY" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Project : $Project"
Write-Host "Time    : $(Get-Date)"
