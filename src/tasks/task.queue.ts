import { Injectable } from "@nestjs/common";
import { Task } from "../contracts/task.contract";

@Injectable()
export class TaskQueue{

    private readonly queue:Task[]=[];

    enqueue(task:Task){
        this.queue.push(task);
    }

    dequeue(){
        return this.queue.shift();
    }

    all(){
        return this.queue;
    }

    size(){
        return this.queue.length;
    }

}
