import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { EngineLoader } from './engines/engine.loader';

@Injectable()
export class BootstrapService {

    private readonly logger = new Logger(BootstrapService.name);

    private readonly loader = new EngineLoader();

    boot() {

        const engines = this.loader.boot();

        const src = path.join(process.cwd(), 'src');

        const modules:string[]=[];
        const controllers:string[]=[];
        const services:string[]=[];

        this.scan(src,modules,controllers,services);

        return{

            status:"ready",

            engines,

            modules,

            controllers,

            services,

            statistics:{

                engines:engines.length,

                modules:modules.length,

                controllers:controllers.length,

                services:services.length

            },

            bootedAt:new Date().toISOString()

        };

    }

    private scan(

        dir:string,
        modules:string[],
        controllers:string[],
        services:string[]

    ){

        const list=fs.readdirSync(dir,{withFileTypes:true});

        for(const item of list){

            const full=path.join(dir,item.name);

            if(item.isDirectory()){

                this.scan(full,modules,controllers,services);
                continue;

            }

            if(item.name.endsWith(".module.ts"))
                modules.push(path.relative(process.cwd(),full));

            if(item.name.endsWith(".controller.ts"))
                controllers.push(path.relative(process.cwd(),full));

            if(item.name.endsWith(".service.ts"))
                services.push(path.relative(process.cwd(),full));

        }

    }

}
