import { Injectable } from '@nestjs/common';

@Injectable()
export class PlatformOSService {

 operate(platform:any){

  return {
   platform:true,
   data:platform
  };

 }

}