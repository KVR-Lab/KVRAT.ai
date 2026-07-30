import * as crypto from 'crypto';

export class CryptoEngine {

  static algorithm = 'aes-256-gcm';


  static encrypt(
    data: string,
    key: Buffer
  ) {

    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv(
      this.algorithm,
      key,
      iv
    ) as crypto.CipherGCM;


    const encrypted = Buffer.concat([
      cipher.update(data, 'utf8'),
      cipher.final()
    ]);


    const tag = cipher.getAuthTag();


    return {
      iv: iv.toString('hex'),
      tag: tag.toString('hex'),
      data: encrypted.toString('hex')
    };

  }

}