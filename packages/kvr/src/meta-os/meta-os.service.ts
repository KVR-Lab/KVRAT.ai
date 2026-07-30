import { Injectable } from '@nestjs/common';

@Injectable()
export class MetaOSService {

 manage(system:any){

  return {
   meta:true,
   system
  };

 }

}