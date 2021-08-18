import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistsService } from './playlists.service';
import { Playlist } from './playlist.entity';
import { PlaylistsController } from './playlists.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist])],
  providers: [PlaylistsService],
  controllers: [PlaylistsController],
  exports: [PlaylistsService]
})
export class PlaylistsModule {}
