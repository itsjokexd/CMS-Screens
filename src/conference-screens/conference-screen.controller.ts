import { Controller, UseGuards } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ConferenceScreen } from "./conference-screen.entity";
import { CreateConferenceScreenDTO } from "./create-conference-screen.dto";
import { UpdateConferenceScreenDTO } from "./update-conference-screen.dto";
import { ConferenceScreensService } from "./conference-screen.service";
import { CreateConferenceScreenGuard } from "./guards/create-conference-screen.guard";
import { ConferenceScreenOwnerGuard } from "./guards/conference-screen-owner.guard";

@Crud({
  model: {
    type: ConferenceScreen,
  },
  routes:{
    createOneBase: {
        decorators:[UseGuards(CreateConferenceScreenGuard)]
    },
    updateOneBase:{
      decorators:[UseGuards(ConferenceScreenOwnerGuard)],
    },
    deleteOneBase:{
      decorators:[UseGuards(ConferenceScreenOwnerGuard)]
    }, 
    exclude:["createManyBase", "replaceOneBase"],
  }, 
  dto: {create: CreateConferenceScreenDTO, update: UpdateConferenceScreenDTO}
})

@Controller("conference-screens")
@ApiTags('Conference Screens')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ConferenceScreensController implements CrudController<ConferenceScreen> {
  constructor(public service: ConferenceScreensService) {}
}


