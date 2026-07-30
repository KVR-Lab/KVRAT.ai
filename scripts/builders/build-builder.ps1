param(
    [Parameter(Mandatory=$true,Position=0)]
    [string]$ModuleName,
    [switch]$Force
)

$ErrorActionPreference="Stop"

$Root=(Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$Src=Join-Path $Root "src"

$Name=(Get-Culture).TextInfo.ToTitleCase($ModuleName.ToLower())
$Slug=$Name.ToLower()
$Dir=Join-Path $Src $Slug

New-Item -ItemType Directory -Force -Path $Dir|Out-Null

function Write-KVRFile{
param([string]$File,[string]$Text)
 if((Test-Path $File) -and !$Force){return}
 [IO.File]::WriteAllText($File,$Text,[Text.UTF8Encoding]::new($false))
 Write-Host "[OK] $File"
}

$module=@"
import { Module } from '@nestjs/common';
import { ${Name}Controller } from './$Slug.controller';
import { ${Name}Service } from './$Slug.service';

@Module({
  controllers:[${Name}Controller],
  providers:[${Name}Service],
  exports:[${Name}Service]
})
export class ${Name}Module {}
"@

$service=@"
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${Name}Service{
  status(){ return {module:'$Slug',status:'ok'}; }
}
"@

$controller=@"
import { Controller, Get } from '@nestjs/common';
import { ${Name}Service } from './$Slug.service';

@Controller('$Slug')
export class ${Name}Controller{
 constructor(private readonly service:${Name}Service){}
 @Get()
 status(){ return this.service.status(); }
}
"@

Write-KVRFile (Join-Path $Dir "$Slug.module.ts") $module
Write-KVRFile (Join-Path $Dir "$Slug.service.ts") $service
Write-KVRFile (Join-Path $Dir "$Slug.controller.ts") $controller
Write-Host "Module generated: $Name"
