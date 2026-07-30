param(
    [Parameter(Mandatory = $true)]
    [string]$Name,

    [switch]$Force
)

$ErrorActionPreference = "Stop"

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$Src  = Join-Path $Root "src"

$Api = $Name.ToLower()
$Class = (Get-Culture).TextInfo.ToTitleCase($Api)

$Folder = Join-Path $Src $Api

New-Item -ItemType Directory -Force -Path $Folder | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $Folder "dto") | Out-Null

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

$controller = @"
import { Controller, Get } from '@nestjs/common';
import { ${Class}Service } from './$Api.service';

@Controller('$Api')
export class ${Class}Controller {

    constructor(
        private readonly service: ${Class}Service
    ) {}

    @Get()
    getAll() {
        return this.service.getAll();
    }

}
"@

$service = @"
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${Class}Service {

    getAll() {
        return [];
    }

}
"@

$dto = @"
export class Create${Class}Dto {

}
"@

$index = @"
export * from './$Api.controller';
export * from './$Api.service';
export * from './dto/create-$Api.dto';
"@

Write-KVRFile (Join-Path $Folder "$Api.controller.ts") $controller
Write-KVRFile (Join-Path $Folder "$Api.service.ts") $service
Write-KVRFile (Join-Path $Folder "dto\create-$Api.dto.ts") $dto
Write-KVRFile (Join-Path $Folder "index.ts") $index

Write-Host ""
Write-Host "======================================="
Write-Host " API Generator Finished"
Write-Host "======================================="
Write-Host "API  : $Class"
Write-Host "Path : $Folder"