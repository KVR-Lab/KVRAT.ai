import { Injectable } from '@nestjs/common';

@Injectable()
export class RuntimePipeline {

    run(input: any) {

        return input;

    }

}