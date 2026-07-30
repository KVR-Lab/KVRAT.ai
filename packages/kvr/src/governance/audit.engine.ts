export class AuditEngine {

 log(event:any){

  return {
   logged:true,
   event
  };

 }

}