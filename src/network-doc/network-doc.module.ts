import { Module } from '@nestjs/common';
import { NetworkDocService } from './network-doc.service';
import { NetworkDocController } from './network-doc.controller';

@Module({
  controllers: [NetworkDocController],
  providers: [NetworkDocService],
})
export class NetworkDocModule {}
