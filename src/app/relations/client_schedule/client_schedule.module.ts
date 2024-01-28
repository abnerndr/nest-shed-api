import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientScheduleRelationEntity } from "./client_schedule.entity";
import { ClientEntity } from "src/app/client/client.entity";
import { ScheduleEntity } from "src/app/schedule/schedule.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ClientScheduleRelationEntity, ClientEntity, ScheduleEntity])]
})
export class ClientScheduleRelationModule { }