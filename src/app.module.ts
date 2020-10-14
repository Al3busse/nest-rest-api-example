import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from "./items/items.module"
import { ConfigModule } from "./config/config.module"
import { ConfigService } from "./config/config.service"


@Module({
  imports: [ItemsModule, MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.get('MONGO_URI'),
      useNewUrlParser: true,
    }),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
