import { Injectable } from '@nestjs/common';

@Injectable()
export class KernelOsService{

 execute(input:any){

  return{

   ok:true,
   system:"kernel-os",
   data:input

  };

 }

}
