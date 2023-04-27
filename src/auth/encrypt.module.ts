import { Module } from '@nestjs/common';
import { EncryptionService } from './encrypt.service';

@Module({
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}
