param(
    [Parameter(Position=0)]
    [string]$Command="help",

    [Parameter(Position=1)]
    [string]$Arg1="",

    [Parameter(Position=2)]
    [string]$Arg2=""
)

switch($Command){

    "build" {
        pnpm build
    }

    "dev" {
        pnpm start:dev
    }

    "doctor" {
        .\kvr-health.ps1
    }

    "bootstrap" {
        .\bootstrap.internal.ps1
    }

    "registry" {
        .\scripts\build-registry.ps1
    }

    "index" {
        pnpm exec ts-node scripts/build-index.ts
    }

    "run" {
        pnpm exec ts-node .\scripts\run-project.ts $Arg1
    }

    "new" {

        if(!$Arg1){
            Write-Host "Usage: kvr new ProjectName"
            exit
        }

        New-Item ".\apps\$Arg1" -ItemType Directory -Force | Out-Null
        Write-Host "Project created: $Arg1"
    }

    "create" {

        if(!$Arg1){
            Write-Host "Usage: kvr create ProjectName"
            exit
        }

        & ".\scripts\create-project.ps1" $Arg1
    }

    "make" {
        & ".\scripts\make.ps1" $Arg1 $Arg2
    }

    "release" {

        pnpm build

        if($LASTEXITCODE -eq 0){
            Write-Host ""
            Write-Host "KVR-Core v1.0 READY"
        }

    }

    default {

        Write-Host ""
        Write-Host "========== KVR-Core =========="
        Write-Host ""
        Write-Host "kvr build"
        Write-Host "kvr dev"
        Write-Host "kvr doctor"
        Write-Host "kvr bootstrap"
        Write-Host "kvr registry"
        Write-Host "kvr index"
        Write-Host "kvr run <project.kvr>"
        Write-Host "kvr new <name>"
        Write-Host "kvr create <name>"
        Write-Host "kvr make <type> <name>"
        Write-Host "kvr release"
        Write-Host ""

    }

}