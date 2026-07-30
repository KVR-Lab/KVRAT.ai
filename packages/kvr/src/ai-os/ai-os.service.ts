import { Injectable } from '@nestjs/common';

@Injectable()
export class AIOSService {

 process(input:any){

  return {
   ai:true,
   input
  };

 }

}