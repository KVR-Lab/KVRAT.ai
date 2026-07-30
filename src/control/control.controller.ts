import { Controller, Get } from '@nestjs/common';

import { CommandCenter } from './command.center';

import { AgentManager } from './agent.manager';

import { RuntimeManager } from './runtime.manager';



@Controller('control')
export class ControlController {



constructor(

private readonly center:CommandCenter,

private readonly agent:AgentManager,

private readonly runtime:RuntimeManager

){}



@Get('status')
status()
{

return {

system:this.center.overview(),

agent:this.agent.status(),

runtime:this.runtime.status()

};

}



}
