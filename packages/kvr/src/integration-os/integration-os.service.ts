import { Injectable } from '@nestjs/common';

@Injectable()
export class IntegrationOsService{

 execute(input:any){

  return{

   ok:true,
   system:"integration-os",
   data:input

  };

 }

}
