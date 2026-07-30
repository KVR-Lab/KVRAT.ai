import { Injectable } from '@nestjs/common';

@Injectable()
export class CommerceOsService{

 execute(input:any){

  return{

   ok:true,
   system:"commerce-os",
   data:input

  };

 }

}
