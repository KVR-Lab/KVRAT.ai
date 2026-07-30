import { Module } from '@nestjs/common';

import { BrainOsModule } from '../brain-os';

import { RuntimeOsModule } from '../runtime-os';

import { AgentOsModule } from '../agent-os';

import { KernelOsModule } from '../kernel-os';

import { SystemOrchestratorModule }
from '../system-orchestrator';

import { MissionControlOsModule }
from '../mission-control-os';

import { SelfImprovementOsModule }
from '../self-improvement-os';

import { AutonomousRuntimeModule }
from '../autonomous-runtime';

import { SystemRegistryModule }
from '../system-registry';

import { RuntimeOrchestratorModule }
from '../runtime-orchestrator';

import { ControlApiModule }
from '../control-api';

import { ReleaseManagerModule }
from '../release-manager';



@Module({

imports:[

    BrainOsModule,

    RuntimeOsModule,

    AgentOsModule,

    KernelOsModule,

    SystemOrchestratorModule,

    MissionControlOsModule,

    SelfImprovementOsModule,

    AutonomousRuntimeModule,

    SystemRegistryModule,

    RuntimeOrchestratorModule,

    ControlApiModule,

    ReleaseManagerModule

]

})

export class CoreHubModule {}