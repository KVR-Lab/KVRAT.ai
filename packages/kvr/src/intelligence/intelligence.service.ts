import { Injectable } from '@nestjs/common';

@Injectable()
export class IntelligenceService {

 analyze(data:any){
   return {
    status:"analyzed",
    data
   };
 }

}