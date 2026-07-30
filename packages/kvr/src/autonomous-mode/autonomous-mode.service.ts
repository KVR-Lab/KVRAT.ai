import { Injectable } from '@nestjs/common';

@Injectable()
export class AutonomousModeService {

    run(context:any){

        return {
            status:"autonomous-running",
            context
        };

    }

}