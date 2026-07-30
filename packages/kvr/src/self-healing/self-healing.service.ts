import { Injectable } from '@nestjs/common';

@Injectable()
export class SelfHealingService {

 repair(issue:any){

  return {
   repaired:true,
   issue
  };

 }

}