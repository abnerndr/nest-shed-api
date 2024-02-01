import { UserEntity } from "../user/user.entity";

export class CreateAuthDto {
  email: string;
}


export class CreateLoginDto {
  email: string;
  passKey: string;
}

export class ResponseSendTokenDto {
  status: number;
  title: string;
  message: string;
}

export class ResponseAuthenticateDto {
  status: number;
  title: string;
  message: string;
  sended: string;
}

export class CreateSendTokenDto {
  email: string;
  link: string;
  name: string;
}

export class CreateJwtVerifyDto {
  token: string;
  userId: string
}

export class ShowLoginDto {
  user: UserEntity;
  token: string;
}

