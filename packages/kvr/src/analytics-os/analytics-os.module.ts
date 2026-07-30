import { Module } from '@nestjs/common';
import { AnalyticsOsService } from './analytics-os.service';

@Module({
 providers:[AnalyticsOsService],
 exports:[AnalyticsOsService]
})
export class AnalyticsOsModule {}
