param(
    [string]$Name = "NewProject",
    [string]$Template = "nestjs"
)

$workspace = Join-Path $PSScriptRoot "..\workspace"
$target = Join-Path $workspace $Name

New-Item -ItemType Directory -Force -Path $target | Out-Null

switch($Template){

    "nestjs" {

        Push-Location $workspace

        pnpm dlx @nestjs/cli new $Name --package-manager pnpm --skip-git

        Pop-Location

    }

    default {

        Write-Host "Unknown template: $Template"

    }

}

Write-Host ""
Write-Host "Project created:"
Write-Host $target
