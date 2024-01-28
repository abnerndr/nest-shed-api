import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReceiptEntity } from "./receipt/receipt.entity";
import { ExpenseEntity } from "./expenses/expenses.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ReceiptEntity, ExpenseEntity])]
})
export class FinancialModule { }