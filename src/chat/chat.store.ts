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
