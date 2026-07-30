import { Injectable } from '@nestjs/common';

@Injectable()
export class DeveloperOsService{

 execute(input:any){

  return{

   ok:true,
   system:"developer-os",
   data:input

  };

 }

}
