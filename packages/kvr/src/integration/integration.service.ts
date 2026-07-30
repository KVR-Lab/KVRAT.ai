import { Injectable } from '@nestjs/common';

@Injectable()
export class IntegrationService {

 connect(source:any,target:any){

  return {
   connected:true,
   source,
   target
  };

 }

}