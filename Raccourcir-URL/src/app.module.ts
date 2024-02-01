import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortUrlModule } from './short-url/short-url.module';
import { ShortUrlService } from './short-url/short-url.service';

require('dotenv').config();

@Module({
  imports: [ShortUrlModule, 
    TypeOrmModule.forRoot({
      type: 'postgres', 
      // IMPORTANTE: Nao usar a variavel port, causa do erro : 
      // Nest  ERROR [TypeOrmModule] Unable to connect to the database. Error: connect ECONNREFUSED 127.0.0.1:3307 
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB, 
      username: process.env.POSTGRES_USER, 
      password: process.env.POSTGRES_PASSWORD, 
      autoLoadEntities: true, 
      // synchronize: Boolean(process.env.SYNCHRONIZE)
      synchronize: true
    }),],
  controllers: [AppController],
  providers: [AppService, ShortUrlService],
})
export class AppModule {}
