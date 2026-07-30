import { Module } from '@nestjs/common';

import { ReleaseManagerService }
from './release-manager.service';



@Module({

providers:[

    ReleaseManagerService

],

exports:[

    ReleaseManagerService

]

})

export class ReleaseManagerModule {}