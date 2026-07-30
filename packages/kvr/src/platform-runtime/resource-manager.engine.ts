export class ResourceManagerEngine{

 allocate(resource:any){

  return{
   allocated:true,
   data:resource
  };

 }

}