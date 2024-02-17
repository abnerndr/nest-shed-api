import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/app/user/user.entity";
import { CompanyEntity } from "src/app/company/company.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, CompanyEntity])],
    providers: [CustomerService]
})
export class CustomerModule { }