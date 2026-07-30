import { Injectable } from '@nestjs/common';

@Injectable()
export class PlatformRuntimeService{

 run(runtime:any){

  return{
   runtime:true,
   data:runtime
  };

 }

}