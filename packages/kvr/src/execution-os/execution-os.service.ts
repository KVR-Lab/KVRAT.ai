import { Injectable } from '@nestjs/common';

@Injectable()
export class ExecutionOSService {

 execute(task:any){

  return {
   executed:true,
   task
  };

 }

}