import { Controller, UseGuards } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateContentDTO } from "./create-content.dto";
import { UpdateContentDTO } from "./update-content.dto";
import { ContentService } from "./content.service";
import { ContentOwnerGuard } from "./guards/content-owner.guard";
import { Content } from "./content.entity";
import { CreateContentGuard } from "./guards/create-content.guard";

@Crud({
  model: {
    type: Content,
  },
  routes:{
    createOneBase: {
        decorators:[UseGuards(CreateContentGuard)]
    },
    updateOneBase:{
      decorators:[UseGuards(ContentOwnerGuard)],
    },
    deleteOneBase:{
      decorators:[UseGuards(ContentOwnerGuard)]
    }, 
    exclude:["createManyBase", "replaceOneBase"],
  }, 
  dto: {create: CreateContentDTO, update: UpdateContentDTO}
})

@Controller("content")
@ApiTags('Content')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ContentController implements CrudController<Content> {
  constructor(public service: ContentService) {}
}


