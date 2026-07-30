export class IdentitySecurityEngine {

 verify(identity:any){

  return {
   verified:true,
   identity
  };

 }

}