import { hash, compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EncryptionService {
  constructor(private readonly configService: ConfigService) { }

  async hash(plain: string): Promise<string> {
    console.log("salt = ", this.configService.get('SALT_ROUNDS'))
    let salt = parseInt(this.configService.get('SALT_ROUNDS'));
    return hash(plain, salt);
  }

  async compare(plain: string, encrypted: string): Promise<boolean> {
    return compare(plain, encrypted);
  }
}
