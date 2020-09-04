import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { QrCodeModule } from './qrCode/qrCode.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/users.entity';

@Module({
  imports: [
    MessagesModule,
    AuthModule,
    UsersModule,
    QrCodeModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '168.197.24.119',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'testdb',
      entities: [Users],
      synchronize: true,
      migrationsTableName: "migration_table",
      migrations: ["src/migration2/*.js"],
      cli: {
        "migrationsDir": "migration"
      }
    }),],
})

export class AppModule { }
