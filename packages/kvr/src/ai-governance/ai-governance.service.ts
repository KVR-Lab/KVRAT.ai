import { Injectable } from '@nestjs/common';

@Injectable()
export class AIGovernanceService {

 govern(ai:any){

  return {
   governed:true,
   ai
  };

 }

}