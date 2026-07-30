import { Injectable } from '@nestjs/common';

@Injectable()
export class GovernanceOSService {

 govern(system:any){

  return {
   governed:true,
   system
  };

 }

}