import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class ProjectRegistryService {


  private registryPath =
    'D:\\kvr-core\\projects\\registry';



  listProjects(){

    if(!fs.existsSync(this.registryPath)){
      return [];
    }


    const files =
      fs.readdirSync(this.registryPath)
      .filter(
        file => file.endsWith('.project.json')
      );


    return files.map(file => {

      const fullPath =
        path.join(
          this.registryPath,
          file
        );


      return JSON.parse(
        fs.readFileSync(
          fullPath,
          'utf8'
        )
      );

    });

  }

}