export class CreateAuthDto {
    email: string;
}

export class CreateLoginDto {
    email: string;
    pass_key: string;
}

export class CreateSendTokenDto {
    email: string;
    link: string;
    name: string;
}

export class CreateJwtVerifyDto {
    token: string;
    user_id: string;
}