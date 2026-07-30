param(
    [Parameter(Position=0,Mandatory=$true)]
    [ValidateSet(
        "module",
        "engine",
        "plugin",
        "tool",
        "api",
        "scheduler",
        "workspace",
        "project",
        "package",
        "contract",
        "pipeline",
        "test",
        "registry",
        "index",
        "build"
    )]
    [string]$Command,

    [Parameter(Position=1)]
    [string]$Name,

    [switch]$Force
)

$ErrorActionPreference = "Stop"

$Root = Split-Path $MyInvocation.MyCommand.Path -Parent

$Builders   = Join-Path $Root "builders"
$Generators = Join-Path $Root "generators"

function RunGenerator {

    param(
        [string]$Script,
        [string]$Argument
    )

    $File = Join-Path $Generators $Script

    if (!(Test-Path $File)) {
        throw "Generator not found: $File"
    }

    if ($Force) {
        powershell -ExecutionPolicy Bypass -File $File $Argument -Force
    }
    else {
        powershell -ExecutionPolicy Bypass -File $File $Argument
    }

    if ($LASTEXITCODE -ne 0) {
        throw "$Script failed."
    }
}

switch ($Command) {

    "module" {
        RunGenerator "module.generator.ps1" $Name
    }

    "engine" {
        RunGenerator "engine.generator.ps1" $Name
    }

    "plugin" {
        RunGenerator "plugin.generator.ps1" $Name
    }

    "tool" {
        RunGenerator "tool.generator.ps1" $Name
    }

    "api" {
        RunGenerator "api.generator.ps1" $Name
    }

    "scheduler" {
        RunGenerator "scheduler.generator.ps1" $Name
    }

    "workspace" {
        RunGenerator "workspace.generator.ps1" $Name
    }

    "project" {
        RunGenerator "project.generator.ps1" $Name
    }

    "package" {
        RunGenerator "package.generator.ps1" $Name
    }

    "contract" {
        RunGenerator "contract.generator.ps1" $Name
    }

    "pipeline" {
        RunGenerator "pipeline.generator.ps1" $Name
    }

    "test" {
        RunGenerator "test.generator.ps1" $Name
    }

    "registry" {

        powershell `
            -ExecutionPolicy Bypass `
            -File (Join-Path $Builders "registry-builder.ps1")

    }

    "index" {

        powershell `
            -ExecutionPolicy Bypass `
            -File (Join-Path $Builders "index-builder.ps1")

    }

    "build" {

        powershell `
            -ExecutionPolicy Bypass `
            -File (Join-Path $Builders "build-builder.ps1")

    }

}

Write-Host ""
Write-Host "========================================"
Write-Host "           KVR CLI COMPLETE"
Write-Host "========================================"
Write-Host "Command : $Command"
if ($Name) {
    Write-Host "Target  : $Name"
}
Write-Host ""