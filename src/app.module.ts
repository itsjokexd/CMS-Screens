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
import { ConferenceScreensModule } from './conference-screens/conference-screens.module';
import { Playlist } from './playlists/playlist.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { PlaylistsContent } from './playlists-content/playlists-content.entity';
import { PlaylistsContentModule } from './playlists-content/playlists-content.module';
import { Content } from './content/content.entity';
import { ContentModule } from './content/content.module';
import { DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, HOST } from 'src/constants';
import * as dotenv from 'dotenv';

//dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [User, ConferenceEvent, ConferenceScreen, Playlist, Content, PlaylistsContent],
      synchronize: true,
    }), UsersModule, ConferenceEventsModule, ConferenceScreensModule, 
    PlaylistsModule, ContentModule, PlaylistsContentModule, AuthModule
  ],
  controllers: [
    AppController, AuthController
  ]
})
export class AppModule {}