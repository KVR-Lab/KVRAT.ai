import { Injectable } from '@nestjs/common';

@Injectable()
export class KVROperatingSystemService{

 boot(system:any){

  return{
   booted:true,
   data:system
  };

 }

}