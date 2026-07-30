import { Module } from '@nestjs/common';
import { AutonomousModeService } from './autonomous-mode.service';

@Module({
    providers:[
        AutonomousModeService
    ],
    exports:[
        AutonomousModeService
    ]
})
export class AutonomousModeModule {}