export class ServiceBusEngine{

 dispatch(message:any){

  return{
   dispatched:true,
   data:message
  };

 }

}