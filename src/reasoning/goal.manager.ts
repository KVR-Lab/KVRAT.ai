import { Injectable } from '@nestjs/common';

@Injectable()
export class GoalManager{
analyze(task:string){
return{goal:task};
}
}
