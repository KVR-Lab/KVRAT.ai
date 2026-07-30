import { Injectable } from '@nestjs/common';

@Injectable()
export class OrchestrationAIService {

 orchestrate(input:any){

  return {
   orchestrated:true,
   input
  };

 }

}