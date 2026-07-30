import { Injectable } from '@nestjs/common';

@Injectable()
export class SingularityOSService {

 unify(system:any){

  return {
   singularity:true,
   system
  };

 }

}