import { Module } from '@nestjs/common';

import { SystemRegistryService } from './system-registry.service';


@Module({

providers:[

    SystemRegistryService

],

exports:[

    SystemRegistryService

]

})

export class SystemRegistryModule {}