import { Module } from '@nestjs/common';


import { StorageService } from './storage.service';

import { SnapshotService } from './snapshot.service';



@Module({

providers:[

StorageService,

SnapshotService

],


exports:[

StorageService,

SnapshotService

]


})
export class StorageModule {}
