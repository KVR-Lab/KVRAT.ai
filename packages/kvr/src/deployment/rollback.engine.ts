export class RollbackEngine {

 rollback(version:any){

  return {
   rollback:true,
   version
  };

 }

}