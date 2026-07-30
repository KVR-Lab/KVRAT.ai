param(
    [Parameter(Mandatory = $true)]
    [string]$Name,

    [switch]$Force
)

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$WorkspaceRoot = Join-Path $Root "src\workspace"

New-Item -ItemType Directory -Force -Path $WorkspaceRoot | Out-Null

$Module = $Name.ToLower()
$Class = (Get-Culture).TextInfo.ToTitleCase($Module)

$Folder = Join-Path $WorkspaceRoot $Module

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

$workspace = @"
export class ${Class}Workspace {

    readonly id = '$Module';

    initialize() {

    }

    dispose() {

    }

}
"@

$config = @"
export interface ${Class}WorkspaceConfig {

    root?: string;

    name?: string;

}
"@

$manager = @"
export class ${Class}WorkspaceManager {

    create() {

        return new ${Class}Workspace();

    }

}
"@

$index = @"
export * from './$Module.workspace';
export * from './$Module.manager';
export * from './$Module.config';
"@

Write-KVRFile `
    -Path (Join-Path $Folder "$Module.workspace.ts") `
    -Content $workspace

Write-KVRFile `
    -Path (Join-Path $Folder "$Module.manager.ts") `
    -Content $manager

Write-KVRFile `
    -Path (Join-Path $Folder "$Module.config.ts") `
    -Content $config

Write-KVRFile `
    -Path (Join-Path $Folder "index.ts") `
    -Content $index

Write-Host ""
Write-Host "======================================"
Write-Host " Workspace Generator Finished"
Write-Host "======================================"
Write-Host "Workspace : $Class"
Write-Host "Path      : $Folder"