import { Module } from "@nestjs/common";
import { ClientScheduleRelationModule } from "./client_schedule/client_schedule.module";

@Module({
    imports: [ClientScheduleRelationModule]
})
export class RealtionsModule { }