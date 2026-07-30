import { Injectable } from '@nestjs/common';

@Injectable()
export class KnowledgeOsService{

 execute(input:any){

  return{

   ok:true,
   system:"knowledge-os",
   data:input

  };

 }

}
