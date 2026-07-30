import { Injectable } from '@nestjs/common';

@Injectable()
export class QuantumOSService {

 compute(input:any){

  return {
   quantum:true,
   input
  };

 }

}