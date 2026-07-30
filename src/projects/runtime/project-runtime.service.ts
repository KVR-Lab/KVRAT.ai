import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ProjectRegistryService } from '../registry/project-registry.service';

@Injectable()
export class ProjectRuntimeService {
  constructor(
    private readonly registry: ProjectRegistryService,
  ) {}

  status() {
    const projects = this.registry.listProjects();

    console.log("Registry:", projects);
    console.log("Is Array:", Array.isArray(projects));

    console.log("=== PROJECTS ===");
console.log(projects);
console.log("TYPE:", typeof projects);
console.log("IS ARRAY:", Array.isArray(projects));

return projects.map((project: any) => {
      const projectPath = project.path;

      return {
        name: project.name,
        path: projectPath,
        registered: true,
        exists: fs.existsSync(projectPath),
        packageJson: fs.existsSync(
          path.join(projectPath, 'package.json'),
        ),
        status: fs.existsSync(projectPath)
          ? 'online'
          : 'missing',
      };
    });
  }
}

