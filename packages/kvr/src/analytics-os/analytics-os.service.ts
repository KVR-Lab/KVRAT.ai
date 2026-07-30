import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsOsService{

 execute(input:any){

  return{

   ok:true,
   system:"analytics-os",
   data:input

  };

 }

}
