import { Injectable } from '@nestjs/common';

@Injectable()
export class DigitalCommerceOSService {

 operate(data:any){

  return {
   commerce:true,
   data
  };

 }

}