import { Injectable } from '@nestjs/common';

@Injectable()
export class RuntimeEngine {

    execute(input: any) {

        return {
            success: true,
            module: 'runtime',
            data: input
        };

    }

}