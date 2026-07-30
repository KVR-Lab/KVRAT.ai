import { Injectable } from '@nestjs/common';

@Injectable()
export class MemoryPipeline {

    run(input: any) {

        return input;

    }

}