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
        CommandService,
        CommandParser
    ]

})
export class CommandModule {}