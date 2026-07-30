import { Injectable } from '@nestjs/common';

@Injectable()
export class EconomyOSService {

 manage(data:any){

  return {
   economy:true,
   data
  };

 }

}