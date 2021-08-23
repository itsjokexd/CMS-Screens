import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistsContentService } from './playlists-content.service';
import { PlaylistsContentController } from './playlists-content.controller';
import { PlaylistsContent } from './playlists-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistsContent])],
  providers: [PlaylistsContentService],
  controllers: [PlaylistsContentController],
  exports: [PlaylistsContentService]
})
export class PlaylistsContentModule {}
