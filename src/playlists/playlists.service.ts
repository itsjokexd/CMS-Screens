import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Playlist } from "./playlist.entity";

@Injectable()
export class PlaylistsService extends TypeOrmCrudService<Playlist> {
  constructor(@InjectRepository(Playlist) repo) {
    super(repo);
  }

  async getAll(): Promise<Playlist[]> {
    return this.repo.find();
  }
}