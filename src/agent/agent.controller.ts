import { Body, Controller, Post } from '@nestjs/common';

import { AgentService } from './agent.service';



@Controller('agent')
export class AgentController {



constructor(

private readonly agent:AgentService

){}




@Post('execute')
execute(

@Body() body:any

)
{

return this.agent.execute(

body

);

}



}
