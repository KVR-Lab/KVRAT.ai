import { Injectable } from '@nestjs/common';

@Injectable()
export class BrainOsService{

 execute(input:any){

  return{

   ok:true,
   system:"brain-os",
   data:input

  };

 }

}
