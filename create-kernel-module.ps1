$path = ".\src\kernel"

if(!(Test-Path $path))
{
    New-Item -ItemType Directory -Path $path -Force | Out-Null
}

$module = @"
import { Module } from '@nestjs/common';

@Module({

    providers: [],

    exports: []

})
export class KvrKernelModule {}
"@

Set-Content `
-Path ".\src\kernel\kernel.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[CREATE] src/kernel/kernel.module.ts"