# ============================================
# K.V.R Chat Event Connector
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Chat Event Connector"


if(!(Test-Path ".\src\events\bus\event.bus.ts"))
{
    throw "Event Bus not found"
}


Log "Event Bus detected"
# ============================================
# Create Chat Event Contract
# ============================================

Log "Creating Chat Event Contract..."


$event = @"
export interface ChatMessageEvent {

    type:string;

    sessionId:string;

    message:string;

    createdAt:string;

}
"@


Set-Content `
-Path ".\src\chat\chat.event.ts" `
-Value $event `
-Encoding UTF8


Write-Host "[CREATE] src/chat/chat.event.ts"


Log "Chat Event Contract ready"
# ============================================
# Update Chat Service With Event Bus
# ============================================

Log "Updating Chat Service..."


$service = @"
import { Injectable } from '@nestjs/common';
import { ChatStore } from './chat.store';
import { EventBus } from '../events/bus/event.bus';


@Injectable()
export class ChatService {


    constructor(

        private readonly store:ChatStore,

        private readonly eventBus:EventBus

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


        this.eventBus.emit({

            type:"chat.message",

            sessionId,

            message,

            createdAt:
            new Date().toISOString()

        });



        return {

            role:"kvr",

            sessionId,

            message:
            "تم استقبال الأمر وتشغيل Event Bus",

            history:
            this.store.get(sessionId)

        };

    }


}
"@


Set-Content `
-Path ".\src\chat\chat.service.ts" `
-Value $service `
-Encoding UTF8


Write-Host "[UPDATED] src/chat/chat.service.ts"


Log "Chat Service Event Connected"
# ============================================
# Update Chat Service With Event Bus
# ============================================

Log "Updating Chat Service..."


$service = @"
import { Injectable } from '@nestjs/common';
import { ChatStore } from './chat.store';
import { EventBus } from '../events/bus/event.bus';


@Injectable()
export class ChatService {


    constructor(

        private readonly store:ChatStore,

        private readonly eventBus:EventBus

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


        this.eventBus.emit({

            type:"chat.message",

            sessionId,

            message,

            createdAt:
            new Date().toISOString()

        });



        return {

            role:"kvr",

            sessionId,

            message:
            "تم استقبال الأمر وتشغيل Event Bus",

            history:
            this.store.get(sessionId)

        };

    }


}
"@


Set-Content `
-Path ".\src\chat\chat.service.ts" `
-Value $service `
-Encoding UTF8


Write-Host "[UPDATED] src/chat/chat.service.ts"


Log "Chat Service Event Connected"