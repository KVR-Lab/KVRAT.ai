import { Injectable } from '@nestjs/common';

@Injectable()
export class SupplyChainOSService {

 manage(chain:any){

  return {
   supplyChain:true,
   chain
  };

 }

}