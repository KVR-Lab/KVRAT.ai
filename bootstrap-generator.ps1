. "$PSScriptRoot\scripts\bootstrap.shared.ps1"
# ============================================
# K.V.R Bootstrap Generator
# Version 1.0
# ============================================

$ErrorActionPreference = "Stop"

$Root = Get-Location

$ModuleName = $args[0]

if([string]::IsNullOrWhiteSpace($ModuleName))
{
    $ModuleName = "Sample"
}

$Module = $ModuleName.ToLower()

$ModulePath = ".\src\$Module"

Ensure-Folder $ModulePath

Write-Host ""
Write-Host "============================================"
Write-Host "     K.V.R Bootstrap Generator"
Write-Host "============================================"
Write-Host ""


function Log($message)
{
    Write-Host "[KVR] $message"
}


function Ensure-Folder($path)
{
    if(!(Test-Path $path))
    {
        New-Item `
        -ItemType Directory `
        -Path $path `
        -Force | Out-Null

        Write-Host "[CREATE] $path"
    }
}


Log "Generator started"

Ensure-Folder ".\src\bootstrap\generated"

Log "Generator workspace ready"
# ============================================
# Engine Registry Generator
# ============================================

Log "Generating Engine Registry..."


$engineRegistry = @"
export const KVR_ENGINES = [

    "runtime",
    "registry",
    "context",

    "event",
    "pipeline",

    "plugin",
    "scheduler",

    "validator",
    "workflow",

    "command",

    "knowledge",
    "memory",
    "planner",
    "executor",
    "ai"

];

"@


Set-Content `
-Path ".\src\bootstrap\generated\engine.registry.ts" `
-Value $engineRegistry `
-Encoding UTF8


Write-Host "[CREATE] src/bootstrap/generated/engine.registry.ts"


Log "Engine Registry generated"
# ============================================
# Bootstrap Metadata Generator
# ============================================

Log "Generating Bootstrap Metadata..."


$metadata = @"
export const KVR_BOOTSTRAP = {

    name: "K.V.R",

    version: "1.0.0",

    engines: 15,

    generator: "Bootstrap Generator",

    createdAt: "$(Get-Date -Format "yyyy-MM-dd HH:mm:ss")"

};

"@


Set-Content `
-Path ".\src\bootstrap\generated\bootstrap.metadata.ts" `
-Value $metadata `
-Encoding UTF8


Write-Host "[CREATE] src/bootstrap/generated/bootstrap.metadata.ts"


Log "Metadata generated"
# ============================================
# Generator Validation
# ============================================

Log "Validating generated files..."


$generatedFiles = @(

".\src\bootstrap\generated\engine.registry.ts",

".\src\bootstrap\generated\bootstrap.metadata.ts"

)



$failed = $false


foreach($file in $generatedFiles)
{

    if(Test-Path $file)
    {

        Write-Host "[OK] $file"

    }
    else
    {

        Write-Host "[FAIL] $file"

        $failed = $true

    }

}



if($failed)
{
    Write-Host "Generator validation failed"
    exit 1
}


Write-Host ""
Write-Host "============================================"
Write-Host " K.V.R Generator READY"
Write-Host "============================================"



