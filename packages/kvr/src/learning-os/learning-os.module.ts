import { Module } from '@nestjs/common';
import { LearningOsService } from './learning-os.service';

@Module({
 providers:[LearningOsService],
 exports:[LearningOsService]
})
export class LearningOsModule {}
