import { Module } from '@nestjs/common';
import { ProjectRegistryService } from './project-registry.service';


@Module({

  providers:[
    ProjectRegistryService
  ],

  exports:[
    ProjectRegistryService
  ]

})
export class ProjectRegistryModule {}