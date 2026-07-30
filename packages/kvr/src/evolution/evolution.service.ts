import { Injectable } from '@nestjs/common';

@Injectable()
export class EvolutionService {

 evolve(system:any){

  return {
   evolved:true,
   system
  };

 }

}