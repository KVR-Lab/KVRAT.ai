import { Injectable } from '@nestjs/common';


@Injectable()
export class AiEngine {



    generate(
        context:any
    )
    {

        return {

            type:"ai.decision",


            input:
            context,


            decision:

            "K.V.R generated decision",


            confidence:

            0.85,


            createdAt:

            new Date()

        };

    }


}
