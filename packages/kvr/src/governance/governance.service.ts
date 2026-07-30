import { Injectable } from '@nestjs/common';

@Injectable()
export class GovernanceService {

 validate(action:any){

  return {
   approved:true,
   action
  };

 }

}