import { Injectable } from '@nestjs/common';

@Injectable()
export class DigitalService {

 process(data:any){

  return {
   digital:true,
   data
  };

 }

}