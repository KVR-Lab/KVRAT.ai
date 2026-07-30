import { Module } from '@nestjs/common';
import { AutomationOsService } from './automation-os.service';

@Module({
 providers:[AutomationOsService],
 exports:[AutomationOsService]
})
export class AutomationOsModule {}
