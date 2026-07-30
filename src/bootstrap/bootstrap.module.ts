import { Module } from '@nestjs/common';


import { SystemModule } from '../system/system.module';

import { OrchestratorModule } from '../orchestrator/orchestrator.module';



import { StartupCheck } from './startup.check';

import { BootService } from './boot.service';



@Module({

imports:[

SystemModule,

OrchestratorModule

],


providers:[

StartupCheck,

BootService

],


exports:[

BootService

]


})
export class BootstrapModule {}
