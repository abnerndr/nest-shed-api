import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StockEntity } from "./stocks.entity";
import { Repository } from "typeorm";

@Injectable()
export class StockService {
    constructor(
        @InjectRepository(StockEntity) private stockService: Repository<StockEntity>
    ) { }
}