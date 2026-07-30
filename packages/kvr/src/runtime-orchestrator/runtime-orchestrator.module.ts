import { Module } from '@nestjs/common';

import { RuntimeOrchestratorService }
from './runtime-orchestrator.service';

import { SystemRegistryModule }
from '../system-registry';



@Module({

imports:[

    SystemRegistryModule

],

providers:[

    RuntimeOrchestratorService

],

exports:[

    RuntimeOrchestratorService

]

})

export class RuntimeOrchestratorModule {}