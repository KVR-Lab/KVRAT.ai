export class WebhookEngine{

 execute(input:any){

  return{

   engine:"webhook",
   success:true,
   data:input

  };

 }

}
