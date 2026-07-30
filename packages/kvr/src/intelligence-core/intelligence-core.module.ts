import { Module } from '@nestjs/common';
import { IntelligenceCoreService } from './intelligence-core.service';

@Module({
 providers:[IntelligenceCoreService],
 exports:[IntelligenceCoreService]
})
export class IntelligenceCoreModule {}