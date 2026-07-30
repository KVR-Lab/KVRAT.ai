import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketplaceOsService{

 execute(input:any){

  return{

   ok:true,
   system:"marketplace-os",
   data:input

  };

 }

}
