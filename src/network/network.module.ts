import { Module, forwardRef } from '@nestjs/common';
import { NetworkService } from './network.service';
import { NetworkController } from './network.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Network } from './entities/network.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Network]),
        forwardRef(() => UsersModule),
        forwardRef(() => AuthModule)
    ],
    controllers: [NetworkController],
    providers: [NetworkService],
    exports: [NetworkService]
})
export class NetworkModule {}
