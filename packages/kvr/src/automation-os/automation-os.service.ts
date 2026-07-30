import { Injectable } from '@nestjs/common';

@Injectable()
export class AutomationOsService{

 execute(input:any){

  return{

   ok:true,
   system:"automation-os",
   data:input

  };

 }

}
