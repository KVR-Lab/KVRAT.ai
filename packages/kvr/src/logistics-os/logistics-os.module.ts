import { Module } from '@nestjs/common';
import { LogisticsOsService } from './logistics-os.service';

@Module({
 providers:[LogisticsOsService],
 exports:[LogisticsOsService]
})
export class LogisticsOsModule {}
