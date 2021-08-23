import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { PlaylistsContent } from "./playlists-content.entity";

@Injectable()
export class PlaylistsContentService extends TypeOrmCrudService<PlaylistsContent> {
  constructor(@InjectRepository(PlaylistsContent) repo) {
    super(repo);
  }

  async getAll(): Promise<PlaylistsContent[]> {
    return this.repo.find();
  }
}