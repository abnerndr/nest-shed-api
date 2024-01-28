import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { ScheduleModule } from "./schedule/schedule.module";
import { ClientModule } from "./client/client.module";
import { StockModule } from "./stocks/stocks.module";
import { FinancialModule } from "./financial/financial.module";
import { RealtionsModule } from "./relations/relations.module";

@Module({
    imports: [
        UserModule,
        ScheduleModule,
        ClientModule,
        StockModule,
        FinancialModule,
        RealtionsModule,
    ]
})
export class AllModule { }