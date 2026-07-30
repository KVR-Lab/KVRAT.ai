import { Injectable } from '@nestjs/common';

import { StartupCheck } from './startup.check';

import { OrchestratorService } from '../orchestrator/orchestrator.service';



@Injectable()
export class BootService {



constructor(

private readonly check:StartupCheck,

private readonly orchestrator:OrchestratorService

){}




start()
{

return {

system:

this.check.verify(),


orchestrator:

this.orchestrator.start(),


status:

'KVR ONLINE'


};


}



}
