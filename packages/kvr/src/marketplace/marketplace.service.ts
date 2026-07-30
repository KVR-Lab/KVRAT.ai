import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketplaceService {

 manage(product:any){

  return {
   marketplace:true,
   product
  };

 }

}