import { Body, Controller, Get, Post } from '@nestjs/common';
import { ControlPlaneService } from './control-plane.service';

@Controller('control')
export class ControlPlaneController {

  constructor(
    private readonly controlPlane: ControlPlaneService,
  ) {}

  @Get('overview')
  overview() {
    return this.controlPlane.overview();
  }

  @Get('health')
  health() {
    return {
      النظام: 'KVR-Core',
      الحالة: 'يعمل',
      الوقت: new Date().toISOString(),
    };
  }

  @Get('projects')
  projects() {
    return this.controlPlane.projects();
  }

  @Get('agents')
  agents() {
    return this.controlPlane.agents();
  }

  @Get('runtime')
  runtime() {
    return this.controlPlane.runtime();
  }

  @Get('commands')
  commands() {
    return this.controlPlane.commands();
  }

  @Get('dashboard')
  dashboard() {
    return this.controlPlane.dashboard();
  }

  @Get('connect')
  connect() {
    return this.controlPlane.connect();
  }

  @Get('logs')
  logs() {
    return this.controlPlane.logs();
  }

  @Get('memory')
  memory() {
    return this.controlPlane.memory();
  }

  @Get('settings')
  settings() {
    return this.controlPlane.settings();
  }

  @Post('chat')
  chat(
    @Body() body: { message: string },
  ) {
    return this.controlPlane.chat(body.message);
  }

  @Post('agent/start')
  startAgent(
    @Body() body: { name: string },
  ) {
    return this.controlPlane.startAgent(body.name);
  }

  @Post('agent/stop')
  stopAgent(
    @Body() body: { name: string },
  ) {
    return this.controlPlane.stopAgent(body.name);
  }

  @Post('project/open')
  openProject(
    @Body() body: { name: string },
  ) {
    return this.controlPlane.openProject(body.name);
  }

}