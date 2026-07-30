export class EventBusEngine{

 publish(event:any){

  return{
   published:true,
   data:event
  };

 }

}