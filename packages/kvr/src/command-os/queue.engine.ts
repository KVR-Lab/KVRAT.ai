export class QueueEngine {

 enqueue(job:any){

  return {
   queued:true,
   job
  };

 }

}