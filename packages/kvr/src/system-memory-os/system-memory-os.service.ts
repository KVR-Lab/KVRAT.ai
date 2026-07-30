import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemMemoryOsService{

 execute(input:any){

  return{

   ok:true,
   system:"system-memory-os",
   data:input

  };

 }

}
