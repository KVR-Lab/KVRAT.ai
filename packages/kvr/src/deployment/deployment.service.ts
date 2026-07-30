import { Injectable } from '@nestjs/common';

@Injectable()
export class DeploymentService {

 deploy(system:any){

  return {
   deployed:true,
   system
  };

 }

}