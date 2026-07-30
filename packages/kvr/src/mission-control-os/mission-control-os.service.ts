import { Injectable } from '@nestjs/common';

@Injectable()
export class MissionControlOsService{

 execute(input:any){

  return{

   ok:true,
   system:"mission-control-os",
   data:input

  };

 }

}
