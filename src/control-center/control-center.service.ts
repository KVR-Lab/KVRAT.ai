import { Injectable } from '@nestjs/common';

@Injectable()
export class ControlCenterService {
  getStatus() {
    return {
      system: {
        name: 'KVR-Core',
        status: 'running',
      },

      runtime: {
        loop: 'active',
        planner: 'ready',
        executor: 'ready',
      },

      projects: [
        {
          id: 'kvrat',
          name: 'KVRAT.ai',
          path: 'D:\\KVRAT.ai',
          status: 'active',
        },
      ],

      agents: [
        {
          name: 'ArchitectAgent',
          status: 'ready',
        },
        {
          name: 'BackendAgent',
          status: 'ready',
        },
        {
          name: 'FrontendAgent',
          status: 'ready',
        },
        {
          name: 'AiAgent',
          status: 'ready',
        },
      ],
    };
  }
}