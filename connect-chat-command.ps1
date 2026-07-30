# ============================================
# K.V.R Chat Command Connector
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Chat Command Connector"


if(!(Test-Path ".\src\command\command.parser.ts"))
{
    throw "Command Parser not found"
}


Log "Command Pipeline detected"
# ============================================
# Update Chat Service With Command Parser
# ============================================

Log "Updating Chat Service..."


$service = @"
import { Injectable } from '@nestjs/common';

import { ChatStore } from './chat.store';

import { EventBus } from '../events/bus/event.bus';

import { CommandParser } from '../command/command.parser';



@Injectable()
export class ChatService {


    constructor(

        private readonly store:ChatStore,

        private readonly eventBus:EventBus,

        private readonly parser:CommandParser

    ){}



    send(

        message:string,

        sessionId:string = "default"

    )
    {

        const command =
        this.parser.parse(message);



        this.store.add(
            sessionId,
            message
        );



        this.eventBus.emit({

            name:"chat.message",

            payload:command,

            createdAt:
            new Date()

        });



        return {

            role:"kvr",

            command,

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


Log "Chat connected to Command Parser"
# ============================================
# Update Chat Module Dependencies
# ============================================

Log "Updating Chat Module..."


$module = @"
import { Module } from '@nestjs/common';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

import { ChatStore } from './chat.store';

import { EventBus } from '../events/bus/event.bus';

import { CommandModule } from '../command/command.module';


@Module({

    imports:[
        CommandModule
    ],

    controllers:[
        ChatController
    ],

    providers:[

        ChatService,

        ChatStore,

        EventBus

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


Write-Host "[UPDATED] src/chat/chat.module.ts"


Log "Chat Command Connector completed"