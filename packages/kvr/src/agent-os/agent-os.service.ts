import { Injectable } from '@nestjs/common';

@Injectable()
export class AgentOsService{

 execute(input:any){

  return{

   ok:true,
   system:"agent-os",
   data:input

  };

 }

}
