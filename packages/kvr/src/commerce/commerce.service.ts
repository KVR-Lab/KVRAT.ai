import { Injectable } from '@nestjs/common';

@Injectable()
export class CommerceService {

 execute(transaction:any){

  return {
   completed:true,
   transaction
  };

 }

}