import { Module } from '@nestjs/common';

import { MemoryStore } from './memory.store';
import { MemoryEngine } from './memory.engine';
import { MemoryService } from './memory.service';
import { MemoryController } from './memory.controller';


@Module({

controllers:[
MemoryController
],

providers:[
MemoryStore,
MemoryEngine,
MemoryService
],

exports:[
MemoryService,
MemoryEngine
]

})
export class MemoryModule {}