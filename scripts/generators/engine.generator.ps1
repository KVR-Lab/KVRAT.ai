param(
    [Parameter(Mandatory = $true)]
    [string]$Name,

    [switch]$Force
)

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$Src  = Join-Path $Root "src"

$Module = $Name.ToLower()
$Class  = (Get-Culture).TextInfo.ToTitleCase($Module)

$Folder = Join-Path $Src $Module

if (!(Test-Path $Folder)) {
    New-Item -ItemType Directory -Force -Path $Folder | Out-Null
}

$File = Join-Path $Folder "$Module.engine.ts"

if ((Test-Path $File) -and !$Force) {
    Write-Host "[SKIP] $File"
    exit
}

$Content = @"
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${Class}Engine {

    execute(input: any): any {

        return input;

    }

    initialize(): void {

    }

    shutdown(): void {

    }

}
"@

[System.IO.File]::WriteAllText(
    $File,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host "[OK] $File"