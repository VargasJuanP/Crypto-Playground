import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NetworkController } from './network.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Network } from './entities/network.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Network])],
    controllers: [NetworkController],
    providers: [NetworkService],
    exports: [NetworkService]
})
export class NetworkModule {}
