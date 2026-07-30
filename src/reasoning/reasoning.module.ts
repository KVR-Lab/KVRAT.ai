import { Module } from '@nestjs/common';

import { GoalManager } from './goal.manager';
import { ReasoningEngine } from './reasoning.engine';

import { AiModule } from '../ai/ai.module';


@Module({

imports:[
AiModule
],

providers:[
GoalManager,
ReasoningEngine
],

exports:[
ReasoningEngine
]

})
export class ReasoningModule {}