
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrchestratorService {

    async execute(context:any){

        return {
            status:"orchestrated",
            context
        };

    }

}
