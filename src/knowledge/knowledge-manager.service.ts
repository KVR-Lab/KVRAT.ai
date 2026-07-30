import { Injectable } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';
import { MemoryService } from '../memory/memory.service';

@Injectable()
export class KnowledgeManagerService {

  constructor(
    private readonly knowledge: KnowledgeService,
    private readonly memory: MemoryService,
  ) {}

  search(query: string) {
    return {
      memory: this.memory.search(query),
      knowledge: this.knowledge.search(query),
    };
  }

  reload() {
    this.knowledge.reload();

    return {
      loaded: true,
      documents: this.knowledge.getAll().length,
    };
  }

  stats() {
    return {
      memory: this.memory.getAll().count,
      documents: this.knowledge.getAll().length,
    };
  }
}