import { Module } from '@nestjs/common';
import { SelfHealingService } from './self-healing.service';

@Module({
 providers:[SelfHealingService],
 exports:[SelfHealingService]
})
export class SelfHealingModule {}