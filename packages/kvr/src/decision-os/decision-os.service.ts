import { Injectable } from '@nestjs/common';

@Injectable()
export class DecisionOsService{

 execute(input:any){

  return{

   ok:true,
   system:"decision-os",
   data:input

  };

 }

}
