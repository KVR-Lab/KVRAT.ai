import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalOSService {

 operate(system:any){

  return {
   global:true,
   system
  };

 }

}