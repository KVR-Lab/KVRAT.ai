import { Module } from '@nestjs/common';


import { MetricsService } from './metrics.service';

import { MonitorService } from './monitor.service';

import { MonitorController } from './monitor.controller';



@Module({

controllers:[

MonitorController

],


providers:[

MetricsService,

MonitorService

],


exports:[

MonitorService,

MetricsService

]


})
export class MonitorModule {}
