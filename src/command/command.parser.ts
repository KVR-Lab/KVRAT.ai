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
