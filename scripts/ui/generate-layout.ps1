$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$UI = Join-Path $Root "apps\kvr-web"

Set-Location $UI

$Folders = @(
"src\components",
"src\components\layout",
"src\components\dashboard",
"src\components\chat",
"src\components\terminal",
"src\components\editor",
"src\components\common",

"src\app\dashboard",
"src\app\chat",
"src\app\projects",
"src\app\workspace",
"src\app\runtime",
"src\app\memory",
"src\app\plugins",
"src\app\monitor",
"src\app\logs",
"src\app\settings",

"src\hooks",
"src\services",
"src\store",
"src\types",
"src\lib",
"src\styles"
)

foreach($Folder in $Folders){

    if(!(Test-Path $Folder)){
        New-Item -ItemType Directory -Force $Folder | Out-Null
        Write-Host "[OK] $Folder"
    }

}

Write-Host ""
Write-Host "====================================="
Write-Host "     KVR UI Layout Generated"
Write-Host "====================================="