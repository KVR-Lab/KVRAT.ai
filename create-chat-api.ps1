# ============================================
# K.V.R Chat API Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Creating Chat API..."


$path = ".\src\chat"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "Chat folder ready"
# ============================================
# Chat Service
# ============================================

Log "Creating Chat Service..."


$service = @"
import { Injectable } from '@nestjs/common';


@Injectable()
export class ChatService {


    send(message:string)
    {

        return {

            role:"kvr",

            message:
            "استلمت الأمر: " + message,

            timestamp:
            new Date().toISOString()

        };

    }


}
"@


Set-Content `
-Path ".\src\chat\chat.service.ts" `
-Value $service `
-Encoding UTF8


Write-Host "[CREATE] src/chat/chat.service.ts"


Log "Chat Service ready"
# ============================================
# Chat Controller
# ============================================

Log "Creating Chat Controller..."


$controller = @"
import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';


@Controller('chat')
export class ChatController {


    constructor(
        private readonly chatService:ChatService
    ){}



    @Post()
    send(
        @Body() body:{message:string}
    )
    {

        return this.chatService.send(
            body.message
        );

    }


}
"@


Set-Content `
-Path ".\src\chat\chat.controller.ts" `
-Value $controller `
-Encoding UTF8


Write-Host "[CREATE] src/chat/chat.controller.ts"


Log "Chat Controller ready"
# ============================================
# Chat Module
# ============================================

Log "Creating Chat Module..."


$module = @"
import { Module } from '@nestjs/common';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';


@Module({

    controllers:[
        ChatController
    ],

    providers:[
        ChatService
    ],

    exports:[
        ChatService
    ]

})
export class ChatModule {}
"@


Set-Content `
-Path ".\src\chat\chat.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[CREATE] src/chat/chat.module.ts"


Log "Chat Module ready"
# ============================================
# Register Chat Module
# ============================================

Log "Registering Chat Module..."


$appFile = ".\src\app.module.ts"


$content = Get-Content $appFile -Raw


if($content -notmatch "ChatModule")
{

$content = $content.Replace(
"import { KvrKernelModule } from './kernel/kernel.module';",
"import { KvrKernelModule } from './kernel/kernel.module';`nimport { ChatModule } from './chat/chat.module';"
)


$content = $content.Replace(
"KvrKernelModule,",
"KvrKernelModule,`n    ChatModule,"
)


Set-Content `
-Path $appFile `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] app.module.ts"

}
else
{
    Write-Host "[SKIP] Chat already registered"
}


Log "Chat API completed"