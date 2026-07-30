import { Injectable } from '@nestjs/common';

@Injectable()
export class AutonomousAgentsOSService {

 run(task:any){

  return {
   autonomous:true,
   task
  };

 }

}