import { BaseEntity, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ScheduleEntity } from "../../schedule/schedule.entity";
import { ClientEntity } from "../../client/client.entity";

@Entity('client_schedule_relatios')
export class ClientScheduleRelationEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => ScheduleEntity, { cascade: true })
    @JoinColumn({ name: 'schedule_uid' })
    schedule: ScheduleEntity

    @OneToOne(() => ClientEntity, { cascade: true })
    @JoinColumn({ name: 'client_uid' })
    client: ClientEntity
}