export class ShutdownEngine{

 stop(state:any){

  return{
   stopped:true,
   data:state
  };

 }

}