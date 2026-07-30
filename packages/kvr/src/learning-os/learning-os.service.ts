import { Injectable } from '@nestjs/common';

@Injectable()
export class LearningOsService{

 execute(input:any){

  return{

   ok:true,
   system:"learning-os",
   data:input

  };

 }

}
