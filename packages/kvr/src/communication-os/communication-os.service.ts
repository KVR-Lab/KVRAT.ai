import { Injectable } from '@nestjs/common';

@Injectable()
export class CommunicationOsService{

 execute(input:any){

  return{

   ok:true,
   system:"communication-os",
   data:input

  };

 }

}
