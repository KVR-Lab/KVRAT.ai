$content = @"
import { Module } from '@nestjs/common';

import { BootstrapController } from './bootstrap.controller';
import { BootstrapService } from './bootstrap.service';

@Module({

    controllers:[
        BootstrapController
    ],

    providers:[
        BootstrapService
    ],

    exports:[
        BootstrapService
    ]

})
export class BootstrapModule {}
"@

Set-Content `
-Path ".\src\bootstrap\bootstrap.module.ts" `
-Value $content `
-Encoding UTF8

Write-Host "[UPDATED] bootstrap.module.ts"