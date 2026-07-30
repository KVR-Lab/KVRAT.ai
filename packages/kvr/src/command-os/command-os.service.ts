import { Injectable } from '@nestjs/common';

@Injectable()
export class CommandOSService {

 execute(command:any){

  return {
   executed:true,
   command
  };

 }

}