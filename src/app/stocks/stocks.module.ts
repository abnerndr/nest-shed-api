import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StockEntity } from "./stocks.entity";
import { StockService } from "./stocks.service";

@Module({
    imports: [TypeOrmModule.forFeature([StockEntity])],
    providers: [StockService]
})
export class StockModule { }