import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { TypeOrmConfigService } from '../shared/typeorm.service';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from 'shared/typeorm-config-helper';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
