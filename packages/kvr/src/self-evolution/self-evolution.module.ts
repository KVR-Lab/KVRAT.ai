import { Module } from '@nestjs/common';
import { SelfEvolutionService } from './self-evolution.service';

@Module({
 providers:[SelfEvolutionService],
 exports:[SelfEvolutionService]
})
export class SelfEvolutionModule {}