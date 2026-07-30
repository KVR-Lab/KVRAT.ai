import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class IdentityService {

  private readonly keyPath =
    'D:\\KVR-KEY\\identity\\device.identity.json';

  loadIdentity() {

    if (!fs.existsSync(this.keyPath)) {
      return {
        status: 'missing',
        message: 'KVR-KEY identity not found'
      };
    }

    const raw = fs.readFileSync(
      this.keyPath,
      'utf-8'
    );

    const identity = JSON.parse(raw);

    return {
      status: 'active',
      identity
    };
  }

}