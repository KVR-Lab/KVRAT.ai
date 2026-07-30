$file = ".\src\ai\ai.service.ts"


$content = @"
import { Injectable } from '@nestjs/common';

import { AiEngine } from './ai.engine';



@Injectable()
export class AiService {


    constructor(
        private readonly engine:AiEngine
    ){}



    think(
        context:any
    )
    {

        return this.engine.generate(context);

    }



    ask(
        prompt:string
    )
    {

        return this.think({

            prompt

        });

    }



    execute(
        command:string
    )
    {

        return this.think({

            command

        });

    }


}
"@


Set-Content `
-Path $file `
-Value $content `
-Encoding UTF8


Write-Host "[UPDATED] ai.service.ts"