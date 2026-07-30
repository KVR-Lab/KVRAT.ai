# ============================================
# KVR Bootstrap Generator V3
# ============================================

param(
    [Parameter(Position = 0)]
    [string]$ModuleName = "Sample",

    [switch]$Force
)

$ErrorActionPreference = "Stop"

$Root = (Get-Location).Path

$ModuleName = (Get-Culture).TextInfo.ToTitleCase(
    $ModuleName.ToLower()
)

$Module = $ModuleName.ToLower()

$ModulePath = Join-Path $Root "src\$Module"

function Log {
    param([string]$Text)

    Write-Host "[KVR] $Text" -ForegroundColor Cyan
}

function Ensure-Folder {

    param([string]$Folder)

    if (!(Test-Path $Folder)) {

        New-Item `
            -ItemType Directory `
            -Path $Folder `
            -Force | Out-Null

        Log "Created $Folder"
    }

}

function Write-KVRFile {

    param(

        [string]$Path,

        [string]$Content

    )

    $Dir = Split-Path -Parent $Path

    Ensure-Folder $Dir

    if ((Test-Path $Path) -and !$Force) {

        Log "Skip $Path"

        return

    }

    [System.IO.File]::WriteAllText(

        $Path,

        $Content,

        [System.Text.UTF8Encoding]::new($false)

    )

    Log "Create $Path"

}

Ensure-Folder $ModulePath

Log "Generating module $ModuleName..."
$ModuleFile = @"
import { Module } from '@nestjs/common';
import { ${ModuleName}Controller } from './$Module.controller';
import { ${ModuleName}Service } from './$Module.service';

@Module({
  controllers: [${ModuleName}Controller],
  providers: [${ModuleName}Service],
  exports: [${ModuleName}Service],
})
export class ${ModuleName}Module {}
"@

$ServiceFile = @"
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${ModuleName}Service {

    status() {

        return {

            module: '$Module',

            status: 'ok',

            time: new Date()

        };

    }

}
"@

$ControllerFile = @"
import { Controller, Get } from '@nestjs/common';
import { ${ModuleName}Service } from './$Module.service';

@Controller('$Module')
export class ${ModuleName}Controller {

    constructor(
        private readonly service: ${ModuleName}Service
    ) {}

    @Get()
    status() {
        return this.service.status();
    }

}
"@
$EngineFile = @"
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${ModuleName}Engine {

    execute(input: any) {

        return {
            success: true,
            module: '$Module',
            data: input
        };

    }

}
"@

$PipelineFile = @"
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${ModuleName}Pipeline {

    run(input: any) {

        return input;

    }

}
"@

$ContextFile = @"
export interface ${ModuleName}Context {

    id?: string;

    state?: string;

}
"@

$IndexFile = @"
export * from './$Module.module';
export * from './$Module.service';
export * from './$Module.controller';
export * from './$Module.engine';
export * from './$Module.pipeline';
export * from './$Module.context';
"@
Write-KVRFile `
    -Path (Join-Path $ModulePath "$Module.module.ts") `
    -Content $ModuleFile

Write-KVRFile `
    -Path (Join-Path $ModulePath "$Module.service.ts") `
    -Content $ServiceFile

Write-KVRFile `
    -Path (Join-Path $ModulePath "$Module.controller.ts") `
    -Content $ControllerFile

Write-KVRFile `
    -Path (Join-Path $ModulePath "$Module.engine.ts") `
    -Content $EngineFile

Write-KVRFile `
    -Path (Join-Path $ModulePath "$Module.pipeline.ts") `
    -Content $PipelineFile

Write-KVRFile `
    -Path (Join-Path $ModulePath "$Module.context.ts") `
    -Content $ContextFile

Write-KVRFile `
    -Path (Join-Path $ModulePath "index.ts") `
    -Content $IndexFile
$Files = @(
    "$Module.module.ts",
    "$Module.service.ts",
    "$Module.controller.ts",
    "$Module.engine.ts",
    "$Module.pipeline.ts",
    "$Module.context.ts",
    "index.ts"
)

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host "        KVR Generator Finished" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

foreach ($File in $Files) {

    $FullPath = Join-Path $ModulePath $File

    if (Test-Path $FullPath) {
        Write-Host "[OK] $File" -ForegroundColor Green
    }
    else {
        Write-Host "[FAIL] $File" -ForegroundColor Red
    }

}

Write-Host ""
Write-Host "Module : $ModuleName"
Write-Host "Path   : $ModulePath"
Write-Host ""
