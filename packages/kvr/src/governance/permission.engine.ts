export class PermissionEngine {

 verify(user:any,action:any){

  return {
   allowed:true,
   user,
   action
  };

 }

}