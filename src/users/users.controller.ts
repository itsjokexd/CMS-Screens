import { Controller, UseGuards } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { User } from "./user.entity";
import { CreateUsersDTO } from "./create-users.dto";
import { UsersService } from "./users.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UpdateUsersDTO } from "./update-users.dto";
import { UserOwnerGuard } from "./guards/user-owner.guard";
import { FreeUsernameGuard } from "./guards/free-username.guard";

@Crud({
  model: {
    type: User,
  },
  routes:{
    createOneBase:{
      decorators:[UseGuards(FreeUsernameGuard)],
    },
    updateOneBase:{
      decorators:[UseGuards(JwtAuthGuard, UserOwnerGuard, FreeUsernameGuard), ApiBearerAuth()],
    },
    deleteOneBase:{
      decorators:[UseGuards(JwtAuthGuard, UserOwnerGuard), ApiBearerAuth()]
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


