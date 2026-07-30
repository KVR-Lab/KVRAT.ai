import { Injectable } from "@nestjs/common";

@Injectable()
export class SchedulerService {

    every(ms:number, task:()=>Promise<void>|void){

        return setInterval(async()=>{

            try{

                await task();

            }catch(e){

                console.error(e);

            }

        },ms);

    }

    schedule(task:any){

        if(typeof task === "function"){

            return this.every(1000, task);

        }

        if(task?.interval && task?.run){

            return this.every(task.interval, task.run);

        }

        return null;

    }

}
