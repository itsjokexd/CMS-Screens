import { Controller, UseGuards } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { User } from "./user.entity";
import { CreateUsersDTO } from "./createUsers.dto";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UpdateUsersDTO } from "./updateUsers.dto";
import { UpdateUsersGuard } from "./guards/update-users.guard";
import { DeleteUsersGuard } from "./guards/delete-users.guard";

@Crud({
  model: {
    type: User,
  },
  routes:{
    updateOneBase:{
      decorators:[UseGuards(JwtAuthGuard, UpdateUsersGuard), ApiBearerAuth()],
    },
    deleteOneBase:{
      decorators:[UseGuards(JwtAuthGuard, DeleteUsersGuard), ApiBearerAuth()]
    }, 
    exclude:["createManyBase", "replaceOneBase"],
  }, 
  dto: {create:CreateUsersDTO, update:UpdateUsersDTO}
})

@Controller("users")
@ApiTags('Users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}


