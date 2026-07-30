New-Item -ItemType Directory -Force .\src\reasoning | Out-Null

@"
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoalManager {

analyze(task:string){

return {
goal:task,
priority:"normal",
createdAt:new Date()
};

}

}
"@ | Set-Content .\src\reasoning\goal.manager.ts

@"
import { Injectable } from '@nestjs/common';
import { GoalManager } from './goal.manager';

@Injectable()
export class ReasoningEngine{

constructor(
private readonly goals:GoalManager
){}

reason(task:string){

return this.goals.analyze(task);

}

}
"@ | Set-Content .\src\reasoning\reasoning.engine.ts

@"
import { Module } from '@nestjs/common';
import { GoalManager } from './goal.manager';
import { ReasoningEngine } from './reasoning.engine';

@Module({
providers:[
GoalManager,
ReasoningEngine
],
exports:[
ReasoningEngine
]
})
export class ReasoningModule{}
"@ | Set-Content .\src\reasoning\reasoning.module.ts

Write-Host "[KVR] Reasoning Pack Created"