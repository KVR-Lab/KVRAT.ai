import { Injectable } from '@nestjs/common';

@Injectable()
export class DataIntelligenceOSService {

 analyze(data:any){

  return {
   intelligence:true,
   data
  };

 }

}