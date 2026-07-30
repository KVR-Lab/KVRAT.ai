import { Controller, Post } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';

@Controller('knowledge')
export class KnowledgeController {

    constructor(
        private readonly knowledge: KnowledgeService
    ) {}

    @Post('load')
    load(){

        return this.knowledge.loadProjectKnowledge();

    }

}