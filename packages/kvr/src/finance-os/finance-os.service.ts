import { Injectable } from '@nestjs/common';

@Injectable()
export class FinanceOsService{

 execute(input:any){

  return{

   ok:true,
   system:"finance-os",
   data:input

  };

 }

}
