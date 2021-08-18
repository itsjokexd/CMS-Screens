import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ConferenceEvent } from "./conference-event.entity";

@Injectable()
export class ConferenceEventsService extends TypeOrmCrudService<ConferenceEvent> {
  constructor(@InjectRepository(ConferenceEvent) repo) {
    super(repo);
  }

  async getAll(): Promise<ConferenceEvent[]> {
    return this.repo.find();
  }
}