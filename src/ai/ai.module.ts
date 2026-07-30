import { Module } from '@nestjs/common';

import { AiService } from './ai.service';
import { AiEngine } from './ai.engine';

import { BrainModule } from './brain/brain.module';
import { LlmModule } from '../llm/llm.module';

@Module({
  imports: [
    BrainModule,
    LlmModule,
  ],

  providers: [
    AiService,
    AiEngine,
  ],

  exports: [
    AiService,
    AiEngine,
  ],
})
export class AiModule {}