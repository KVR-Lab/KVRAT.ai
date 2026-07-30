import { Injectable } from '@nestjs/common';
import { MemoryService } from '../../memory/memory.service';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class KnowledgeService {

    constructor(
        private readonly memory: MemoryService
    ) {}


    loadProjectKnowledge(){

        const filePath =
        path.join(
            process.cwd(),
            'knowledge',
            'projects',
            'KVRAT.ai',
            'master-context.md'
        );


        if(!fs.existsSync(filePath)){
            return {
                loaded:false,
                message:"master-context.md not found"
            };
        }


        const content =
        fs.readFileSync(
            filePath,
            'utf8'
        );


        this.memory.store(
  {
    project: "KVRAT.ai",
    content: content
  }
);


        return {
            loaded:true,
            file:filePath,
            size:content.length
        };

    }

}