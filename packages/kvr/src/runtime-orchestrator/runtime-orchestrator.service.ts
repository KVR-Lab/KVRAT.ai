import { Injectable } from '@nestjs/common';

import { SystemRegistryService }
from '../system-registry';



@Injectable()
export class RuntimeOrchestratorService {


    constructor(

        private registry:
            SystemRegistryService

    ){}





    status(){


        return {


            runtime:

                "active",


            systems:

                this.registry.list()


        };


    }





    start(){


        return {


            message:

                "KVR Runtime Started",


            systems:

                this.registry.health()


        };


    }





    execute(task:string){


        return {


            task,


            status:

                "queued",


            engine:

                "runtime-orchestrator"


        };


    }


}