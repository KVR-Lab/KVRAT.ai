import { Module } from '@nestjs/common';
import { DataIntelligenceOSService } from './data-intelligence-os.service';

@Module({
 providers:[DataIntelligenceOSService],
 exports:[DataIntelligenceOSService]
})
export class DataIntelligenceOSModule {}