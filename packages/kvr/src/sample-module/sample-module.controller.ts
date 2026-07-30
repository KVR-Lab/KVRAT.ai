import { Controller, Get } from '@nestjs/common';
import { SampleModuleService } from './sample-module.service';

@Controller('sample-module')
export class SampleModuleController {

    constructor(
        private readonly service:SampleModuleService
    ){}

    @Get("health")
    health(){
        return this.service.health();
    }

}
