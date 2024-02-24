import { Module } from "@nestjs/common";
import { PaymentMethodService } from "./payment-method.service";
import { PaymentMethodController } from "./payment-method.controller";
import { UserService } from "src/app/user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/app/user/user.entity";
import { CompanyService } from "src/app/company/company.service";
import { CustomerService } from "../customer/customer.service";
import { CompanyEntity } from "src/app/company/company.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, CompanyEntity])],
    providers: [PaymentMethodService, UserService, CompanyService, CustomerService],
    controllers: [PaymentMethodController]
})
export class PaymentMethodModule { }