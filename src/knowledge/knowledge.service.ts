import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface KnowledgeDocument {
  name: string;
  path: string;
  content: string;
}

@Injectable()
export class KnowledgeService implements OnModuleInit {
  private readonly docsPath = path.resolve(process.cwd(), 'docs');
  private documents: KnowledgeDocument[] = [];

  onModuleInit(): void {
    this.reload();
  }

  getAll(): KnowledgeDocument[] {
    return this.documents;
  }

  reload(): void {
    this.documents = [];
    this.scan(this.docsPath);

    console.log('');
    console.log('==============================');
    console.log('KVR Knowledge Loaded');
    console.log('==============================');
    console.log(`Documents : ${this.documents.length}`);
    console.log('');
  }

  search(query: string): KnowledgeDocument[] {
    const q = query.toLowerCase();

    return this.documents.filter(
      d =>
        d.name.toLowerCase().includes(q) ||
        d.content.toLowerCase().includes(q),
    );
  }

  private scan(dir: string): void {
    if (!fs.existsSync(dir)) return;

    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      const stat = fs.statSync(full);

      if (stat.isDirectory()) {
        this.scan(full);
        continue;
      }

      if (!item.endsWith('.md')) continue;

      this.documents.push({
        name: item,
        path: full,
        content: fs.readFileSync(full, 'utf8'),
      });
    }
  }
}