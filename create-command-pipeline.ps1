# ============================================
# K.V.R Command Pipeline Generator
# ============================================

$ErrorActionPreference = "Stop"


function Log($msg)
{
    Write-Host "[KVR] $msg"
}


Log "Starting Command Pipeline Generator"


$path = ".\src\command"


if(!(Test-Path $path))
{
    New-Item `
    -ItemType Directory `
    -Path $path `
    -Force | Out-Null
}


Log "Command folder ready"
# ============================================
# Create Command Parser
# ============================================

Log "Creating Command Parser..."


$parser = @"
import { Injectable } from '@nestjs/common';


@Injectable()
export class CommandParser {


    parse(
        message:string
    )
    {

        return {

            original:message,

            command:
            message.trim(),

            createdAt:
            new Date()

        };

    }


}
"@


Set-Content `
-Path ".\src\command\command.parser.ts" `
-Value $parser `
-Encoding UTF8


Write-Host "[CREATE] src/command/command.parser.ts"


Log "Command Parser ready"
# ============================================
# Create Command DTO
# ============================================

Log "Creating Command DTO..."


$dto = @"
export class CommandInputDto {


    message:string;


    sessionId?:string;


}
"@


Set-Content `
-Path ".\src\command\command.input.dto.ts" `
-Value $dto `
-Encoding UTF8


Write-Host "[CREATE] src/command/command.input.dto.ts"


Log "Command DTO ready"
# ============================================
# Update Command Module
# ============================================

Log "Updating Command Module..."


$module = @"
import { Module } from '@nestjs/common';

import { CommandController } from './command.controller';
import { CommandService } from './command.service';

import { CommandParser } from './command.parser';


@Module({

    controllers:[

        CommandController

    ],

    providers:[

        CommandService,

        CommandParser

    ],

    exports:[

        CommandParser

    ]

})
export class CommandModule {}
"@


Set-Content `
-Path ".\src\command\command.module.ts" `
-Value $module `
-Encoding UTF8


Write-Host "[UPDATED] src/command/command.module.ts"


Log "Command Pipeline foundation ready"