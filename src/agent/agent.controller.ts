import { Body, Controller, Post } from '@nestjs/common';
import { RequireExecutionKey } from '../security/execution-access.guard';

import { AgentService } from './agent.service';



@RequireExecutionKey()
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
