import { Injectable } from '@nestjs/common';

@Injectable()
export class KVRATRuntimeService {

 run(application:any){

  return {
   running:true,
   application
  };

 }

}