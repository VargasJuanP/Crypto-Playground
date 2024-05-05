import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { NetworkDocModule } from './network-doc/network-doc.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'user1',
        password: 'password',
        database: 'db_users',
        autoLoadEntities: true,
        synchronize: true
    }),
    AuthModule,
    NetworkDocModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
