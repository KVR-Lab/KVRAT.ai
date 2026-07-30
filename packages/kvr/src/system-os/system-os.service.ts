import { Injectable } from '@nestjs/common';

@Injectable()
export class SystemOSService {

 manage(system:any){

  return {
   managed:true,
   system
  };

 }

}