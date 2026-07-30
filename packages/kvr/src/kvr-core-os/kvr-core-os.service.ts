import { Injectable } from '@nestjs/common';

@Injectable()
export class KVRCoreOSService{

 run(data:any){

  return{
   core:true,
   data
  };

 }

}