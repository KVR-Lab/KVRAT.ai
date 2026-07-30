 # KVR Bootstrap Generator V2 (Starter)
param(
    [Parameter(Position=0)]
    [string]$ModuleName="Sample",
    [switch]$Force
)

$ErrorActionPreference="Stop"

function Ensure-Folder($Path){
    if(!(Test-Path $Path)){
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Write-KVRFile {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path,

        [Parameter(Mandatory = $true)]
        [AllowEmptyString()]
        [string]$Content
    )

    $Folder = [System.IO.Path]::GetDirectoryName($Path)

    if (-not (Test-Path $Folder)) {
        New-Item -ItemType Directory -Force -Path $Folder | Out-Null
    }

    if ((Test-Path $Path) -and (-not $Force)) {
        return
    }

    [System.IO.File]::WriteAllText(
        $Path,
        $Content,
        [System.Text.UTF8Encoding]::new($false)
    )
}
$ModuleName = (Get-Culture).TextInfo.ToTitleCase($ModuleName.ToLower())
$Module = $ModuleName.ToLower()
$Root = (Get-Location).Path
$ModulePath = Join-Path -Path $Root -ChildPath "src\$Module"

Ensure-Folder $ModulePath

$module=@"
import { Module } from '@nestjs/common';
import { ${ModuleName}Service } from './$Module.service';
import { ${ModuleName}Controller } from './$Module.controller';

@Module({
 controllers:[${ModuleName}Controller],
 providers:[${ModuleName}Service],
 exports:[${ModuleName}Service]
})
export class ${ModuleName}Module{}
"@

$service=@"
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${ModuleName}Service{
 status(){
  return {
   module:'$Module',
   status:'ok'
  };
 }
}
"@

$controller=@"
import { Controller,Get } from '@nestjs/common';
import { ${ModuleName}Service } from './$Module.service';

@Controller('$Module')
export class ${ModuleName}Controller{

 constructor(private readonly service:${ModuleName}Service){}

 @Get()
 status(){
  return this.service.status();
 }

}
"@

$engine=@"
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${ModuleName}Engine{
 execute(input:any){
  return input;
 }
}
"@

$pipeline=@"
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${ModuleName}Pipeline{
 run(data:any){
  return data;
 }
}
"@

$context=@"
export interface ${ModuleName}Context{
 id?:string;
 state?:string;
}
"@

$index=@"
export * from './$Module.module';
export * from './$Module.service';
export * from './$Module.controller';
export * from './$Module.engine';
export * from './$Module.pipeline';
export * from './$Module.context';
"@

Write-KVRFile "$ModulePath\$Module.module.ts" $module
Write-KVRFile "$ModulePath\$Module.service.ts" $service
Write-KVRFile "$ModulePath\$Module.controller.ts" $controller
Write-KVRFile "$ModulePath\$Module.engine.ts" $engine
Write-KVRFile "$ModulePath\$Module.pipeline.ts" $pipeline
Write-KVRFile "$ModulePath\$Module.context.ts" $context
Write-KVRFile "$ModulePath\index.ts" $index
Write-Host ""
Write-Host "===================================="
Write-Host " KVR Generator Finished"
Write-Host "===================================="
Write-Host "Module: $ModuleName"
Write-Host "Path  : $ModulePath"
