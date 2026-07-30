import { Controller, Get } from '@nestjs/common';
import { ProjectRegistryService } from './project-registry.service';


@Controller('projects')
export class ProjectRegistryController {


  constructor(
    private readonly registry:
    ProjectRegistryService
  ){}



  @Get('registry')
  list(){

    return this.registry.listProjects();

  }

}