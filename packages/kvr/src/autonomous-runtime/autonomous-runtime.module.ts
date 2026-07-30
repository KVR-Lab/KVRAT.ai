import { Module } from '@nestjs/common';

import { AutonomousRuntimeService } from './autonomous-runtime.service';


@Module({

providers:[

    AutonomousRuntimeService

],

exports:[

    AutonomousRuntimeService

]

})

export class AutonomousRuntimeModule {}