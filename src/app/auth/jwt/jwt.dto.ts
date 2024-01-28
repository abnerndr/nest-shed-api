import { JwtEntity } from "./jwt.entity";

export class CreateJwtDto {
    token: string;
    user_id: string;
}

export class ShowJwtDto extends JwtEntity { }