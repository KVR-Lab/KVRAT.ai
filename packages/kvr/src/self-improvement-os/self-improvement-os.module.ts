import { Module } from '@nestjs/common';
import { SelfImprovementOsService } from './self-improvement-os.service';

@Module({
 providers:[SelfImprovementOsService],
 exports:[SelfImprovementOsService]
})
export class SelfImprovementOsModule {}
