import { Module } from '@nestjs/common';

import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';

import { MemoryModule } from '../../memory/memory.module';

@Module({
  imports: [
    MemoryModule
  ],
  controllers: [
    KnowledgeController
  ],
  providers: [
    KnowledgeService
  ],
  exports: [
    KnowledgeService
  ]
})
export class KnowledgeModule {}