import { Injectable } from '@nestjs/common';

@Injectable()
export class VisionService {

    status() {

        return {

            module: 'vision',

            status: 'ok',

            time: new Date()

        };

    }

}