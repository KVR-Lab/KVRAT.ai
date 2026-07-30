export class GatewayEngine {

 route(request:any){

  return {
   routed:true,
   request
  };

 }

}