import { Module } from '@nestjs/common';
import { DecisionOsService } from './decision-os.service';

@Module({
 providers:[DecisionOsService],
 exports:[DecisionOsService]
})
export class DecisionOsModule {}
