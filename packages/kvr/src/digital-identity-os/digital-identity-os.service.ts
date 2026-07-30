import { Injectable } from '@nestjs/common';

@Injectable()
export class DigitalIdentityOSService {

 identify(entity:any){

  return {
   identity:true,
   entity
  };

 }

}