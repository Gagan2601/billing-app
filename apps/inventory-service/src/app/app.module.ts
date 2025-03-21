import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from '@billing-app/database';
import { ProductModule } from '../product/product.module';
import { AppService } from './app.service';

@Module({
  imports: [ProductModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
