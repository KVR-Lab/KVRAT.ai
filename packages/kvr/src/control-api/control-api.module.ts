import { Module } from '@nestjs/common';

import { ControlApiController }
from './control-api.controller';

import { RuntimeOrchestratorModule }
from '../runtime-orchestrator';



@Module({

imports:[

    RuntimeOrchestratorModule

],

controllers:[

    ControlApiController

]

})

export class ControlApiModule {}