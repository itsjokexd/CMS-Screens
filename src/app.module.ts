import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { ConferenceEventsModule } from './conference-events/conference-events.module';
import { ConferenceEvent } from './conference-events/conference-event.entity';
import { ConferenceScreen } from './conference-screens/conference-screen.entity';
import { ConferenceScreensModule } from './conference-screens/conference-screen.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1',
      database: 'cms-screens',
      entities: [User, ConferenceEvent, ConferenceScreen],
      synchronize: true,
    }), UsersModule, ConferenceEventsModule, ConferenceScreensModule, AuthModule
  ],
  controllers: [
    AppController, AuthController
  ]
})
export class AppModule {}