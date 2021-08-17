import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserData } from "src/common/decorators/user.decorator";
import { User } from "src/users/user.entity";
import { AuthorizationParamsDTO } from "./auth.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiTags('Auth')
  @ApiOperation({ summary: "User authentication" })
  async login(@UserData() user: User, @Body() input: AuthorizationParamsDTO) {
    return this.authService.login(user);
  }
}