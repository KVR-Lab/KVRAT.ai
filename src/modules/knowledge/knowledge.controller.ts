import { Controller, Post } from '@nestjs/common';
import { RequireExecutionKey } from '../../security/execution-access.guard';
import { KnowledgeService } from './knowledge.service';

@RequireExecutionKey()
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