import { Injectable } from '@nestjs/common';

@Injectable()
export class ControlCenterOSService {

 control(command:any){

  return {
   controlled:true,
   command
  };

 }

}