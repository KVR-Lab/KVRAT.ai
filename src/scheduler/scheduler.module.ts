import { Module } from '@nestjs/common';


import { AgentModule } from '../agent/agent.module';


import { TaskQueue } from './task.queue';

import { SchedulerService } from './scheduler.service';



@Module({

imports:[

AgentModule

],


providers:[

TaskQueue,

SchedulerService

],


exports:[

SchedulerService

]


})
export class SchedulerModule {}
