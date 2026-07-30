import { Module } from "@nestjs/common";

import { ControlPlaneController } from "./control-plane.controller";
import { ControlPlaneService } from "./control-plane.service";

import { BrainModule } from "../brain/brain.module";

@Module({
  imports: [
    BrainModule,
  ],
  controllers: [
    ControlPlaneController,
  ],
  providers: [
    ControlPlaneService,
  ],
  exports: [
    ControlPlaneService,
  ],
})
export class ControlPlaneModule {}