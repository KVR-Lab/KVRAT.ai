import { Injectable } from '@nestjs/common';

@Injectable()
export class MasterOSService {

 run(system:any){

  return {
   master:true,
   system
  };

 }

}