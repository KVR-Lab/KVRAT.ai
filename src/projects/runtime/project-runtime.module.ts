import { Module } from '@nestjs/common';
import { ProjectRegistryModule } from '../registry/project-registry.module';
import { ProjectRuntimeService } from './project-runtime.service';
import { ProjectRuntimeController } from './project-runtime.controller';

@Module({
  imports: [ProjectRegistryModule],
  providers: [ProjectRuntimeService],
  controllers: [ProjectRuntimeController],
})
export class ProjectRuntimeModule {}