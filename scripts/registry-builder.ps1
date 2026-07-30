# ============================================
# KVR Registry Builder
# ============================================

$ErrorActionPreference = "Stop"

$Root = (Get-Location).Path
$Src = Join-Path $Root "src"
$Generated = Join-Path $Src "bootstrap\generated"

if (!(Test-Path $Generated)) {
    New-Item -ItemType Directory -Force -Path $Generated | Out-Null
}

Write-Host ""
Write-Host "====================================="
Write-Host "      KVR Registry Builder"
Write-Host "====================================="
Write-Host ""

$Modules = @()
$Services = @()
$Engines = @()
$Plugins = @()

Get-ChildItem -Path $Src -Recurse -File | ForEach-Object {

    $Name = $_.Name

    if ([string]::IsNullOrWhiteSpace($Name)) {
        return
    }

    switch -Wildcard ($Name) {

        "*.module.ts" {
            $Modules += ($Name -replace '\.module\.ts$','')
        }

        "*.service.ts" {
            $Services += ($Name -replace '\.service\.ts$','')
        }

        "*.engine.ts" {
            $Engines += ($Name -replace '\.engine\.ts$','')
        }

        "*.plugin.ts" {
            $Plugins += ($Name -replace '\.plugin\.ts$','')
        }

    }

}

function Export-Registry {

    param(

        [string]$Name,

        [array]$Items

    )

    $Lines = @()

    $ConstName = $Name.Replace(".","_")
    $Lines += "export const $ConstName = ["

    foreach($Item in ($Items | Sort-Object -Unique)){

        $Lines += "    '$Item',"

    }

    $Lines += "];"

    $File = Join-Path $Generated "$Name.ts"

    [System.IO.File]::WriteAllLines(
        $File,
        $Lines,
        [System.Text.UTF8Encoding]::new($false)
    )

    Write-Host "[OK] $Name.ts"

}

Export-Registry "module.registry" $Modules
Export-Registry "service.registry" $Services
Export-Registry "engine.registry" $Engines
Export-Registry "plugin.registry" $Plugins

Write-Host ""
Write-Host "Done."
