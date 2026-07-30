import { Injectable } from '@nestjs/common';

@Injectable()
export class RuntimeOsService{

 execute(input:any){

  return{

   ok:true,
   system:"runtime-os",
   data:input

  };

 }

}
