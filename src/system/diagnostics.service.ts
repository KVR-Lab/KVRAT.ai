import { Injectable } from '@nestjs/common';



@Injectable()
export class DiagnosticsService {



report()
{

return {

runtime:true,

agent:true,

memory:true,

knowledge:true,

ai:true,

planner:true,

executor:true

};


}


}
