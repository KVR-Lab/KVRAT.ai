import { Injectable } from '@nestjs/common';

@Injectable()
export class SampleModuleService {

    health() {
        return {
            module: "sample-module",
            status: "ok"
        };
    }

}
