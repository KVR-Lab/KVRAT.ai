import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudOsService{

 execute(input:any){

  return{

   ok:true,
   system:"cloud-os",
   data:input

  };

 }

}
