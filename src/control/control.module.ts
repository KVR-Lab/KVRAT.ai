import { Module } from '@nestjs/common';

import { AgentModule } from '../agent/agent.module';
import { RuntimeModule } from '../runtime/runtime.module';
import { CommandModule } from '../command/command.module';

import { AgentManager } from './agent.manager';
import { RuntimeManager } from './runtime.manager';
import { CommandCenter } from './command.center';

import { ControlController } from './control.controller';


@Module({

imports:[

  AgentModule,

  RuntimeModule,

  CommandModule

],


controllers:[

  ControlController

],


providers:[

  AgentManager,

  RuntimeManager,

  CommandCenter

],


exports:[

  CommandCenter

]

})
export class ControlModule {}