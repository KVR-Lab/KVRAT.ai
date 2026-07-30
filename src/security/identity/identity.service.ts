import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class IdentityService {

  private findKvrKey(): string | null {

    const drives = [
      'D:',
      'E:',
      'F:',
      'G:',
      'H:',
      'I:',
      'J:'
    ];

    for (const drive of drives) {

      const identityPath = path.join(
        drive,
        'KVR-KEY',
        'identity',
        'device.identity.json'
      );

      if (fs.existsSync(identityPath)) {
        return identityPath;
      }

    }

    return null;
  }


  loadIdentity() {

    const keyPath = this.findKvrKey();

    if (!keyPath) {
      return {
        status: 'missing',
        message: 'KVR-KEY not detected'
      };
    }


    const raw = fs.readFileSync(
      keyPath,
      'utf-8'
    );


    const identity = JSON.parse(raw);


    return {
      status: 'active',
      source: keyPath,
      identity
    };

  }

}