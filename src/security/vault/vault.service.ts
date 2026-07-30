import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';


@Injectable()
export class VaultService {


  private vaultPath =
    'D:\\KVR-KEY\\vault';


  private registryPath =
    'D:\\KVR-KEY\\vault\\metadata\\secrets.registry.json';


  private key =
    crypto
      .createHash('sha256')
      .update('KVR-ROOT-VAULT-KEY')
      .digest();



  status() {

    return {
      system: 'KVR',
      vault: 'ready',
      status: 'locked'
    };

  }



  encryptFile(
    source: string,
    name: string
  ) {


    const data =
      fs.readFileSync(source);


    const iv =
      crypto.randomBytes(12);


    const cipher =
      crypto.createCipheriv(
        'aes-256-gcm',
        this.key,
        iv
      );


    const encrypted =
      Buffer.concat([
        cipher.update(data),
        cipher.final()
      ]);


    const tag =
      cipher.getAuthTag();



    const output = {

      iv:
        iv.toString('hex'),

      tag:
        tag.toString('hex'),

      data:
        encrypted.toString('hex')

    };



    const target =
      path.join(
        this.vaultPath,
        'encrypted',
        name + '.enc'
      );


    fs.writeFileSync(
      target,
      JSON.stringify(
        output,
        null,
        2
      )
    );



    this.updateRegistry(
      source,
      name
    );



    return {

      source,

      target,

      status: 'encrypted'

    };

  }



  private updateRegistry(
    source:string,
    name:string
  ) {


    let registry:any = {

      system:'KVR',
      vault:'KVR-KEY',
      version:'1.0',
      secrets:[],
      status:'initialized',
      managedBy:'KVR-Core'

    };


    if(
      fs.existsSync(
        this.registryPath
      )
    ){

      registry =
        JSON.parse(
          fs.readFileSync(
            this.registryPath,
            'utf8'
          )
        );

    }



    registry.secrets.push({

      name,

      source,

      encrypted:true,

      created:
        new Date()
          .toISOString()

    });



    registry.status =
      'active';



    fs.writeFileSync(

      this.registryPath,

      JSON.stringify(
        registry,
        null,
        2
      )

    );


  }

}