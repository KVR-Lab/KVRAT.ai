import { Injectable } from '@nestjs/common';

@Injectable()
export class AutonomyOSService {

 operate(context:any){

  return {
   autonomous:true,
   context
  };

 }

}