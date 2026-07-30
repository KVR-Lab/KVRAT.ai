param(
    [Parameter(Mandatory = $true)]
    [string]$Name,

    [switch]$Force
)

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$Src  = Join-Path $Root "src"

$Plugin = $Name.ToLower()
$Class  = (Get-Culture).TextInfo.ToTitleCase($Plugin)

$Folder = Join-Path $Src "plugins\$Plugin"

if (!(Test-Path $Folder)) {
    New-Item -ItemType Directory -Path $Folder -Force | Out-Null
}

function Write-KVRFile {

    param(
        [string]$Path,
        [string]$Content
    )

    if ((Test-Path $Path) -and !$Force) {
        return
    }

    [System.IO.File]::WriteAllText(
        $Path,
        $Content,
        [System.Text.UTF8Encoding]::new($false)
    )

    Write-Host "[OK] $Path"
}

$plugin = @"
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${Class}Plugin {

    readonly name = '$Plugin';

    load(): boolean {

        return true;

    }

    unload(): boolean {

        return true;

    }

}
"@

$index = @"
export * from './$Plugin.plugin';
"@

Write-KVRFile `
    -Path (Join-Path $Folder "$Plugin.plugin.ts") `
    -Content $plugin

Write-KVRFile `
    -Path (Join-Path $Folder "index.ts") `
    -Content $index

Write-Host ""
Write-Host "====================================="
Write-Host " Plugin Generated"
Write-Host "====================================="
Write-Host "Plugin : $Class"
Write-Host "Path   : $Folder"