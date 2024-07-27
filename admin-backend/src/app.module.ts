import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './config.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
