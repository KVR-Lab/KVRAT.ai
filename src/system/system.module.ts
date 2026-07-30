import { Module } from '@nestjs/common';


import { LoggerService } from './logger.service';

import { ConfigService } from './config.service';

import { HealthService } from './health.service';

import { DiagnosticsService } from './diagnostics.service';



@Module({

providers:[

LoggerService,

ConfigService,

HealthService,

DiagnosticsService

],


exports:[

LoggerService,

ConfigService,

HealthService,

DiagnosticsService

]


})
export class SystemModule {}
