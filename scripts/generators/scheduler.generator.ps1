param(
    [Parameter(Mandatory=$true)]
    [string]$Name,

    [switch]$Force
)

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$Src  = Join-Path $Root "src\scheduler"

New-Item -ItemType Directory -Force -Path $Src | Out-Null

$Module = $Name.ToLower()
$Class  = (Get-Culture).TextInfo.ToTitleCase($Module)

$Folder = Join-Path $Src $Module
New-Item -ItemType Directory -Force -Path $Folder | Out-Null

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

$scheduler = @"
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${Class}Scheduler {

    start(): void {

    }

    stop(): void {

    }

    tick(): void {

    }

}
"@

$queue = @"
export class ${Class}Queue {

    enqueue(item:any){

    }

    dequeue(){

        return null;

    }

}
"@

$index = @"
export * from './$Module.scheduler';
export * from './$Module.queue';
"@

Write-KVRFile `
    -Path (Join-Path $Folder "$Module.scheduler.ts") `
    -Content $scheduler

Write-KVRFile `
    -Path (Join-Path $Folder "$Module.queue.ts") `
    -Content $queue

Write-KVRFile `
    -Path (Join-Path $Folder "index.ts") `
    -Content $index

Write-Host ""
Write-Host "======================================"
Write-Host " Scheduler Generator Finished"
Write-Host "======================================"
Write-Host "Scheduler : $Class"
Write-Host "Path      : $Folder"