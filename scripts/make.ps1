param(
    [string]$Type,
    [string]$Name
)

if([string]::IsNullOrWhiteSpace($Type)){
    Write-Host "Usage: kvr make <type> <name>"
    exit
}

if([string]::IsNullOrWhiteSpace($Name)){
    $Name = "Sample"
}

$target = Join-Path "src" $Name
New-Item -ItemType Directory -Force -Path $target | Out-Null

switch ($Type) {

    "module" {

@"
import { Module } from '@nestjs/common';
import { ${Name}Service } from './$($Name.ToLower()).service';

@Module({
  providers:[${Name}Service],
  exports:[${Name}Service]
})
export class ${Name}Module {}
"@ | Set-Content "$target\$($Name.ToLower()).module.ts"

@"
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${Name}Service {}
"@ | Set-Content "$target\$($Name.ToLower()).service.ts"

@"
export * from './$($Name.ToLower()).module';
export * from './$($Name.ToLower()).service';
"@ | Set-Content "$target\index.ts"

    }

    "engine" {

@"
export class ${Name}Engine {

    async execute() {

    }

}
"@ | Set-Content "$target\$($Name.ToLower()).engine.ts"

    }

    "plugin" {

@"
export class ${Name}Plugin {

    async load() {

    }

}
"@ | Set-Content "$target\$($Name.ToLower()).plugin.ts"

    }

    "tool" {

@"
export class ${Name}Tool {

    async execute() {

    }

}
"@ | Set-Content "$target\$($Name.ToLower()).tool.ts"

    }

    default {

        Copy-Item ".\templates\$Type\template.kvr" "$target\template.kvr" -Force -ErrorAction SilentlyContinue

    }

}

Write-Host ""
Write-Host "$Type created -> $target"


Write-Host ""
Write-Host "Updating project..."

& ".\scripts\post-make.ps1"

