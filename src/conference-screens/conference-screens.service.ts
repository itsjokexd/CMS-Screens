import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ConferenceScreen } from "./conference-screen.entity";

@Injectable()
export class ConferenceScreensService extends TypeOrmCrudService<ConferenceScreen> {
  constructor(@InjectRepository(ConferenceScreen) repo) {
    super(repo);
  }

  async getAll(): Promise<ConferenceScreen[]> {
    return this.repo.find();
  }
}