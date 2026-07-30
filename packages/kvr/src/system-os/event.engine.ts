export class EventEngine {

 emit(event:any){

  return {
   emitted:true,
   event
  };

 }

}