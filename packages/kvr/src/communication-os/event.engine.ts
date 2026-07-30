export class CommunicationEventEngine {

 publish(event:any){

  return {
   published:true,
   event
  };

 }

}