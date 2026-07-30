import { Injectable } from '@nestjs/common';

@Injectable()
export class IdentityOsService{

 execute(input:any){

  return{

   ok:true,
   system:"identity-os",
   data:input

  };

 }

}
