import { Controller, Get, Post, Body } from '@nestjs/common';

import { RuntimeOrchestratorService }
from '../runtime-orchestrator';



@Controller('kvr')
export class ControlApiController {


    constructor(

        private runtime:
            RuntimeOrchestratorService

    ){}





    @Get('status')
    status(){


        return this.runtime.status();


    }





    @Post('start')
    start(){


        return this.runtime.start();


    }





    @Post('execute')
    execute(

        @Body() body:any

    ){


        return this.runtime.execute(

            body.task

        );


    }


}