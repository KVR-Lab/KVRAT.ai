import { Injectable } from '@nestjs/common';

@Injectable()
export class LogisticsOsService{

 execute(input:any){

  return{

   ok:true,
   system:"logistics-os",
   data:input

  };

 }

}
