import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemOrchestratorService{

 execute(input:any){

  return{

   ok:true,
   system:"system-orchestrator",
   data:input

  };

 }

}
