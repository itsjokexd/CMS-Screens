import { Controller, UseGuards } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ConferenceEvent } from "./conference-event.entity";
import { ConferenceEventOwnerGuard } from "./guards/conference-event-owner.guard";
import { CreateConferenceEventDTO } from "./create-conference-event.dto";
import { ConferenceEventsService } from "./conference-events.service";
import { CreateConferenceEventGuard } from "./guards/create-conference-event.guard";
import { UpdateConferenceEventDTO } from "./update-conference-event.dto";

@Crud({
  model: {
    type: ConferenceEvent,
  },
  routes:{
    createOneBase: {
        decorators:[UseGuards(CreateConferenceEventGuard)]
    },
    updateOneBase:{
      decorators:[UseGuards(ConferenceEventOwnerGuard)],
    },
    deleteOneBase:{
      decorators:[UseGuards(ConferenceEventOwnerGuard)]
    }, 
    exclude:["createManyBase", "replaceOneBase"],
  }, 
  dto: {create: CreateConferenceEventDTO, update: UpdateConferenceEventDTO}
})

@Controller("conference-events")
@ApiTags('Conference Events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ConferenceEventsController implements CrudController<ConferenceEvent> {
  constructor(public service: ConferenceEventsService) {}
}


