import { Injectable } from '@nestjs/common';


@Injectable()
export class SystemRegistryService {


    private systems = [

        "brain-os",

        "knowledge-os",

        "runtime-os",

        "agent-os",

        "kernel-os",

        "mission-control-os",

        "self-improvement-os",

        "system-orchestrator"

    ];




    list(){


        return this.systems.map(system => ({


            name: system,


            status: "registered"


        }));


    }





    register(name:string){


        if(!this.systems.includes(name)){


            this.systems.push(name);


        }



        return {


            name,


            status:"registered"


        };


    }





    health(){


        return {


            total:

                this.systems.length,


            systems:

                this.list()


        };


    }


}