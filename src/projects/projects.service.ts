import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import * as fs from 'fs-extra';
import * as path from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class ProjectsService {
  private readonly filePath = path.join(
    process.cwd(),
    'data',
    'projects',
    'projects.json',
  );

  constructor() {
    this.ensureStorage();
  }

  private ensureStorage() {
    fs.ensureFileSync(this.filePath);

    const content = fs.readFileSync(this.filePath, 'utf8').trim();

    if (!content) {
      fs.writeJsonSync(this.filePath, [], { spaces: 2 });
    }
  }

  private readProjects(): any[] {
    return fs.readJsonSync(this.filePath);
  }

  private saveProjects(projects: any[]) {
    fs.writeJsonSync(this.filePath, projects, { spaces: 2 });
  }

  create(dto: CreateProjectDto) {
    const projects = this.readProjects();

    const project = {
      id: randomUUID(),
      name: dto.name,
      path: dto.path,
      status: 'registered',
      createdAt: new Date().toISOString(),
    };

    projects.push(project);

    this.saveProjects(projects);

    return project;
  }

  findAll() {
    return this.readProjects();
  }

  findOne(id: string) {
    return this.readProjects().find((p) => p.id === id);
  }

  update(id: string, dto: UpdateProjectDto) {
    const projects = this.readProjects();

    const index = projects.findIndex((p) => p.id === id);

    if (index === -1) {
      return null;
    }

    projects[index] = {
      ...projects[index],
      ...dto,
    };

    this.saveProjects(projects);

    return projects[index];
  }

  remove(id: string) {
    const projects = this.readProjects();

    const filtered = projects.filter((p) => p.id !== id);

    this.saveProjects(filtered);

    return {
      deleted: true,
    };
  }
}