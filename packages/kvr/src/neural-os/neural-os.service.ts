import { Injectable } from '@nestjs/common';

@Injectable()
export class NeuralOSService {

 process(data:any){

  return {
   neural:true,
   data
  };

 }

}