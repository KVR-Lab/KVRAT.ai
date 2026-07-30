import { Injectable } from '@nestjs/common';

@Injectable()
export class SupplyChainOsService{

 execute(input:any){

  return{

   ok:true,
   system:"supply-chain-os",
   data:input

  };

 }

}
