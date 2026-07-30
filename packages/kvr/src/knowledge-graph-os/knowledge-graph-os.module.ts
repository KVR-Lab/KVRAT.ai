import { Module } from '@nestjs/common';
import { KnowledgeGraphOSService } from './knowledge-graph-os.service';

@Module({
 providers:[KnowledgeGraphOSService],
 exports:[KnowledgeGraphOSService]
})
export class KnowledgeGraphOSModule {}