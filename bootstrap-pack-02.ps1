$bootstrap = "D:\KVR-Core\src\bootstrap"

@'
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
'@ | Set-Content "$bootstrap\bootstrap.service.ts"
@'
import { Controller, Get } from '@nestjs/common';
import { BootstrapService } from './bootstrap.service';

@Controller('bootstrap')
export class BootstrapController {

    constructor(
        private readonly bootstrapService: BootstrapService,
    ) {}

    @Get()
    run() {
        return this.bootstrapService.boot();
    }

}
'@ | Set-Content "$bootstrap\bootstrap.controller.ts"

@'
import { Module } from '@nestjs/common';

import { BootstrapController } from './bootstrap.controller';
import { BootstrapService } from './bootstrap.service';

@Module({

    controllers:[
        BootstrapController
    ],

    providers:[
        BootstrapService
    ],

    exports:[
        BootstrapService
    ]

})
export class BootstrapModule {}
'@ | Set-Content "$bootstrap\bootstrap.module.ts"

Write-Host ""
Write-Host "==========================================="
Write-Host " KVR Bootstrap Pack 02 Installed"
Write-Host "==========================================="
Write-Host ""

