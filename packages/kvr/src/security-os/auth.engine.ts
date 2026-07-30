export class AuthEngine {

 authenticate(user:any){

  return {
   authenticated:true,
   user
  };

 }

}