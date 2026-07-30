import { Module } from '@nestjs/common';


import { ControlModule } from '../control/control.module';

import { SystemModule } from '../system/system.module';


import { GatewayController } from './gateway.controller';

import { HealthController } from './health.controller';



@Module({

imports:[

ControlModule,

SystemModule

],


controllers:[

GatewayController,

HealthController

]


})
export class GatewayModule {}
