import { Injectable } from '@nestjs/common';

@Injectable()
export class EcosystemService {

 manage(system:any){

  return {
   managed:true,
   system
  };

 }

}