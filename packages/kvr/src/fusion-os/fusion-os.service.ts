import { Injectable } from '@nestjs/common';

@Injectable()
export class FusionOSService {

 fuse(components:any){

  return {
   fused:true,
   components
  };

 }

}