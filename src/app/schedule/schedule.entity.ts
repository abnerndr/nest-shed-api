import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ClientEntity } from '../client/client.entity';
import { ScheduleStatusProps } from './dto/schedule';

@Entity('schedules')
export class ScheduleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint', generated: 'increment' })
  bid: number;

  @Column({ type: 'text', default: 'default' })
  status: ScheduleStatusProps;

  @Column({ type: 'boolean', default: false })
  is_notified: boolean;

  @Column({ type: 'text', default: '' })
  start_date: string;

  @Column({ type: 'text', default: '' })
  end_date: string;

  @Column({ type: 'int', default: 0 })
  session_time: number;

  @Column({ type: 'text', default: '' })
  service_category: string;

  @Column({ type: 'text', default: '' })
  service_name: string;

  @Column({ type: 'text', default: '' })
  service_price: string;

  @OneToOne(() => ClientEntity, { cascade: true })
  @JoinColumn({ name: 'client_uid' })
  client: ClientEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updated_at: Date;
}
