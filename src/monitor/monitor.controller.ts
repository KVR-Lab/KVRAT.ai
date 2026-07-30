import { Controller, Get } from '@nestjs/common';

import { MonitorService } from './monitor.service';



@Controller('monitor')
export class MonitorController {



constructor(

private readonly monitor:MonitorService

){}



@Get('status')
status()
{

return this.monitor.status();

}



}
