import { Controller, Get } from '@nestjs/common';

import { CommandCenter } from '../control/command.center';



@Controller('gateway')
export class GatewayController {



constructor(

private readonly center:CommandCenter

){}



@Get('info')
info()
{

return this.center.overview();

}



}
