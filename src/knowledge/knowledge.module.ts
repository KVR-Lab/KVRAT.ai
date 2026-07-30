import { Module } from '@nestjs/common';

import { KnowledgeController } from './knowledge.controller';

import { KnowledgeService } from './knowledge.service';
import { KnowledgeLoader } from './knowledge-loader.service';

import { KnowledgeStore } from './knowledge.store';
import { KnowledgeEngine } from './knowledge.engine';

@Module({
    controllers: [
        KnowledgeController
    ],

    providers: [
        KnowledgeStore,
        KnowledgeEngine,
        KnowledgeService,
        KnowledgeLoader
    ],

    exports: [
        KnowledgeStore,
        KnowledgeEngine,
        KnowledgeService,
        KnowledgeLoader
    ]
})
export class KnowledgeModule {}