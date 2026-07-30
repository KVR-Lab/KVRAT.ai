import { Injectable } from '@nestjs/common';



@Injectable()
export class TaskQueue {



private tasks:any[] = [];



push(
task:any
)
{

this.tasks.push(task);

}




next()
{

return this.tasks.shift();

}




all()
{

return this.tasks;

}



}
