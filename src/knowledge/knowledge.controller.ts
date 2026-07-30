import { Controller, Get, Post, Query } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';

@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly knowledge: KnowledgeService) {}

  @Get()
  all() {
    return this.knowledge.getAll().map(d => ({
      name: d.name,
      path: d.path,
      size: d.content.length,
    }));
  }

  @Get('search')
  search(@Query('q') q = '') {
    return this.knowledge.search(q).map(d => ({
      name: d.name,
      path: d.path,
    }));
  }

  @Get('stats')
  stats() {
    const docs = this.knowledge.getAll();

    return {
      documents: docs.length,
      characters: docs.reduce((a, b) => a + b.content.length, 0),
    };
  }

  @Post('reload')
  reload() {
    this.knowledge.reload();

    return {
      success: true,
      documents: this.knowledge.getAll().length,
    };
  }
}