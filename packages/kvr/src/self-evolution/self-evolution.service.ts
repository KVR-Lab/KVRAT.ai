import { Injectable } from '@nestjs/common';

@Injectable()
export class SelfEvolutionService {

 evolve(system:any){

  return {
   evolved:true,
   system
  };

 }

}