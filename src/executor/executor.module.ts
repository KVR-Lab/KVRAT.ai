import { Module } from '@nestjs/common';
import { ExecutorService } from './executor.service';
import { ExecutorController } from './executor.controller';
import { BuildModule } from '../build/build.module';

@Module({
  imports: [
    BuildModule,
  ],
  controllers: [
    ExecutorController,
  ],
  providers: [
    ExecutorService,
  ],
  exports: [
    ExecutorService,
  ],
})
export class ExecutorModule {}