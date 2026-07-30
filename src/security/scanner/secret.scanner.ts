import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface SecretFinding {  path: string;
  type: string;
  risk: string;
}


@Injectable()
export class SecretScanner {

  private readonly patterns = [
    {
      name: '.env',
      risk: 'HIGH'
    },
    {
      name: '.pem',
      risk: 'HIGH'
    },
    {
      name: '.key',
      risk: 'HIGH'
    },
    {
      name: '.pfx',
      risk: 'HIGH'
    },
    {
      name: '.crt',
      risk: 'MEDIUM'
    },
    {
      name: 'credentials',
      risk: 'HIGH'
    },
    {
      name: 'token',
      risk: 'MEDIUM'
    },
    {
      name: 'secret',
      risk: 'MEDIUM'
    }
  ];


  private readonly excluded = [
    'node_modules',
    '.git',
    'dist',
    '.next',
    '.pnpm-store',
    '.cache',
    'AppData\\Local\\Temp',
    'Windows',
    'System Volume Information'
  ];


  scan(root: string): SecretFinding[] {

    const results: SecretFinding[] = [];

    this.walk(
      root,
      results
    );

    return results;

  }


  private walk(
    dir: string,
    results: SecretFinding[]
  ) {

    let files: string[];

    try {

      files = fs.readdirSync(dir);

    } catch {

      return;

    }


    for (const file of files) {

      const fullPath =
        path.join(dir, file);


      if (
        this.isExcluded(fullPath)
      ) {
        continue;
      }


      try {

        const stat =
          fs.statSync(fullPath);


        if (stat.isDirectory()) {

          this.walk(
            fullPath,
            results
          );

          continue;

        }


        const lower =
          file.toLowerCase();


        for (const pattern of this.patterns) {

          if (
            lower.includes(
              pattern.name
            )
          ) {

            results.push({

              path: fullPath,

              type: pattern.name,

              risk: pattern.risk

            });

            break;

          }

        }


      } catch {

        continue;

      }

    }

  }


  private isExcluded(
    target: string
  ): boolean {

    return this.excluded.some(
      item =>
        target
          .toLowerCase()
          .includes(
            item.toLowerCase()
          )
    );

  }

}