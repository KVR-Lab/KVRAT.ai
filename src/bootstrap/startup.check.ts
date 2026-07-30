import { Injectable } from '@nestjs/common';

import { HealthService } from '../system/health.service';

import { DiagnosticsService } from '../system/diagnostics.service';



@Injectable()
export class StartupCheck {



constructor(

private readonly health:HealthService,

private readonly diagnostics:DiagnosticsService

){}



verify()
{

return {

health:

this.health.check(),


diagnostics:

this.diagnostics.report(),


ready:true

};


}


}
