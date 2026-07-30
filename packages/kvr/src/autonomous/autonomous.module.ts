import { Module } from "@nestjs/common";
import { AutonomousService } from "./autonomous.service";

@Module({

    providers:[AutonomousService],

    exports:[AutonomousService]

})

export class AutonomousModule {}
