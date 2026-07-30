import { Injectable } from '@nestjs/common';

@Injectable()
export class KnowledgeGraphOSService {

 build(data:any){

  return {
   graph:true,
   data
  };

 }

}