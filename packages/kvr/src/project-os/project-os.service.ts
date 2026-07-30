import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectOSService {

 manage(project:any){

  return {
   project:true,
   data:project
  };

 }

}