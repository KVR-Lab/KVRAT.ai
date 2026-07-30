export class PermissionEngine {

 authorize(request:any){

  return {
   authorized:true,
   request
  };

 }

}