# ============================================
# K.V.R Chat Memory Upgrade
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Chat Memory Upgrade"


$chatPath = ".\src\chat"


if(!(Test-Path $chatPath))
{
    throw "Chat module not found"
}


Log "Chat module detected"
# ============================================
# Create Chat Context
# ============================================

Log "Creating Chat Context..."


$context = @"
export interface ChatContext {

    sessionId:string;

    history:string[];

    createdAt:string;

}
"@


Set-Content `
-Path ".\src\chat\chat.context.ts" `
-Value $context `
-Encoding UTF8


Write-Host "[CREATE] src/chat/chat.context.ts"


Log "Chat Context ready"
# ============================================
# Create Chat Store
# ============================================

Log "Creating Chat Store..."


$store = @"
import { Injectable } from '@nestjs/common';


@Injectable()
export class ChatStore {


    private sessions = new Map<string,string[]>();



    add(
        sessionId:string,
        message:string
    )
    {

        if(!this.sessions.has(sessionId))
        {
            this.sessions.set(
                sessionId,
                []
            );
        }


        this.sessions
        .get(sessionId)!
        .push(message);

    }



    get(
        sessionId:string
    )
    {

        return this.sessions.get(sessionId) || [];

    }


}
"@


Set-Content `
-Path ".\src\chat\chat.store.ts" `
-Value $store `
-Encoding UTF8


Write-Host "[CREATE] src/chat/chat.store.ts"


Log "Chat Store ready"
# ============================================
# Upgrade Chat Service
# ============================================

Log "Updating Chat Service..."


$service = @"
import { Injectable } from '@nestjs/common';
import { ChatStore } from './chat.store';


@Injectable()
export class ChatService {


    constructor(
        private readonly store:ChatStore
    ){}



    send(
        message:string,
        sessionId:string = "default"
    )
    {

        this.store.add(
            sessionId,
            message
        );


        return {

            role:"kvr",

            sessionId,

            message:
            "تم حفظ الأمر: " + message,

            history:
            this.store.get(sessionId),

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


Write-Host "[UPDATED] src/chat/chat.service.ts"


Log "Chat Service upgraded"

# ============================================
# Update Chat Module
# ============================================

Log "Updating Chat Module..."


$module = @"
import { Module } from '@nestjs/common';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatStore } from './chat.store';


@Module({

    controllers:[
        ChatController
    ],

    providers:[
        ChatService,
        ChatStore
    ],

    exports:[
        ChatService,
        ChatStore
    ]

})
export class ChatModule {}
"@


Set-Content `
-Path ".\src\chat\chat.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[UPDATED] src/chat/chat.module.ts"


Log "Chat Memory Upgrade completed"