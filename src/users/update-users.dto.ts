import { OmitType } from "@nestjs/swagger";
import { CreateUsersDTO } from "./create-users.dto";

export class UpdateUsersDTO extends OmitType(CreateUsersDTO, ['password'] as const) {
}