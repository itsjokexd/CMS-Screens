import { Controller, UseGuards } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UpdatePlaylistsContentDTO } from "./update-playlists-content.dto";
import { PlaylistsContentService } from "./playlists-content.service";
import { CreatePlaylistsContentGuard } from "./guards/create-playlists-content.guard";
import { PlaylistsContentOwnerGuard } from "./guards/playlists-content-owner.guard";
import { PlaylistsContent } from "./playlists-content.entity";
import { CreatePlaylistsContentDTO } from "./create-playlists-content.dto";

@Crud({
  model: {
    type: PlaylistsContent,
  },
  routes:{
    createOneBase: {
        decorators:[UseGuards(CreatePlaylistsContentGuard)]
    },
    updateOneBase:{
      decorators:[UseGuards(PlaylistsContentOwnerGuard)],
    },
    deleteOneBase:{
      decorators:[UseGuards(PlaylistsContentOwnerGuard)]
    }, 
    exclude:["createManyBase", "replaceOneBase"],
  }, 
  dto: {create: CreatePlaylistsContentDTO, update: UpdatePlaylistsContentDTO}
})

@Controller("playlists-content")
@ApiTags('Playlists Content')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PlaylistsContentController implements CrudController<PlaylistsContent> {
  constructor(public service: PlaylistsContentService) {}
}


