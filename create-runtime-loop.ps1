# ============================================
# K.V.R Runtime Loop Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Runtime Loop Generator"


$path = ".\src\runtime"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "Runtime folder ready"
# ============================================
# Create Runtime Service
# ============================================

Log "Creating Runtime Service..."


$service = @"
import { Injectable } from '@nestjs/common';
import { EventBus } from '../events/bus/event.bus';


@Injectable()
export class RuntimeService {


    constructor(
        private readonly eventBus:EventBus
    ){}



    process()
    {

        const events =
        this.eventBus.getEvents();



        return {

            status:"runtime.active",

            processed:
            events.length,

            events

        };

    }


}
"@


Set-Content `
-Path ".\src\runtime\runtime.service.ts" `
-Value $service `
-Encoding UTF8


Write-Host "[CREATE] src/runtime/runtime.service.ts"


Log "Runtime Service ready"
# ============================================
# Create Runtime Module
# ============================================

Log "Creating Runtime Module..."


$module = @"
import { Module } from '@nestjs/common';

import { RuntimeService } from './runtime.service';

import { EventBus } from '../events/bus/event.bus';


@Module({

    providers:[

        RuntimeService,

        EventBus

    ],

    exports:[

        RuntimeService

    ]

})
export class RuntimeModule {}
"@


Set-Content `
-Path ".\src\runtime\runtime.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[CREATE] src/runtime/runtime.module.ts"


Log "Runtime Module ready"
# ============================================
# Register Runtime Module
# ============================================

Log "Registering Runtime Module..."


$appFile = ".\src\app.module.ts"


$content = Get-Content $appFile -Raw


if($content -notmatch "RuntimeModule")
{

$content = $content.Replace(
"import { ChatModule } from './chat/chat.module';",
"import { ChatModule } from './chat/chat.module';`nimport { RuntimeModule } from './runtime/runtime.module';"
)


$content = $content.Replace(
"ChatModule,",
"ChatModule,`n    RuntimeModule,"
)


Set-Content `
-Path $appFile `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] app.module.ts"

}
else
{
    Write-Host "[SKIP] Runtime already registered"
}


Log "Runtime Loop completed"