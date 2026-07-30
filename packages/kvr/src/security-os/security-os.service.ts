import { Injectable } from '@nestjs/common';

@Injectable()
export class SecurityOsService{

 execute(input:any){

  return{

   ok:true,
   system:"security-os",
   data:input

  };

 }

}
