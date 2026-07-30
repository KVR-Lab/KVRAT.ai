import { Injectable } from '@nestjs/common';

@Injectable()
export class BuildEngine {

  execute(input: any) {
    return input;
  }

}
