import { Injectable } from '@nestjs/common';

@Injectable()
export class IntelligenceCoreService {

 think(input:any){

  return {
   intelligence:true,
   input
  };

 }

}