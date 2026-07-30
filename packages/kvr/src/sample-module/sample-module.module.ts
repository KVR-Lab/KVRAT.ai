import { Module } from '@nestjs/common';
import { SampleModuleService } from './sample-module.service';
import { SampleModuleController } from './sample-module.controller';

@Module({
  controllers: [SampleModuleController],
  providers: [SampleModuleService],
  exports: [SampleModuleService],
})
export class SampleModuleModule {}
