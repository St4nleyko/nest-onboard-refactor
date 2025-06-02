import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const user = configService.get('DB_USER');
        const pass = configService.get('DB_PASSWORD');
        const dbName = configService.get('DB_NAME');
        return {
          uri: `mongodb+srv://${user}:${pass}${dbName}/?retryWrites=true&w=majority&appName=Cluster0`,
        };
      },
    }),
    PostsModule,
    AuthModule,
    UsersModule
    ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
