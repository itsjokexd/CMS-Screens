import { Controller, UseGuards } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreatePlaylistDTO } from "./create-playlist.dto";
import { UpdatePlaylistDTO } from "./update-playlist.dto";
import { PlaylistsService } from "./playlists.service";
import { Playlist } from "./playlist.entity";
import { CreatePlaylistGuard } from "./guards/create-playlist.guard";
import { PlaylistOwnerGuard } from "./guards/playlist-owner.guard";

@Crud({
  model: {
    type: Playlist,
  },
  routes:{
    createOneBase: {
        decorators:[UseGuards(CreatePlaylistGuard)]
    },
    updateOneBase:{
      decorators:[UseGuards(PlaylistOwnerGuard)],
    },
    deleteOneBase:{
      decorators:[UseGuards(PlaylistOwnerGuard)]
    }, 
    exclude:["createManyBase", "replaceOneBase"],
  }, 
  dto: {create: CreatePlaylistDTO, update: UpdatePlaylistDTO}
})

@Controller("playlists")
@ApiTags('Playlists')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PlaylistsController implements CrudController<Playlist> {
  constructor(public service: PlaylistsService) {}
}


