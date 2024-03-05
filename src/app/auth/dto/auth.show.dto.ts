import { UserEntity } from "src/app/user/user.entity";

export class ShowLoginDto {
    user: UserEntity;
    token: string;
}