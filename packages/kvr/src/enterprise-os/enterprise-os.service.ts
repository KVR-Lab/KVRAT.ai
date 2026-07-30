import { Injectable } from '@nestjs/common';

@Injectable()
export class EnterpriseOSService {

 manage(company:any){

  return {
   enterprise:true,
   company
  };

 }

}