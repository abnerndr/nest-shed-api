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
import { ScheduleEntity } from '../schedule/schedule.entity';

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint', generated: 'increment' })
  bid: number;

  @Column({ type: 'text', default: '' })
  name: string;

  @Column({ type: 'text', default: '' })
  email: string;

  @Column({ type: 'text', default: '' })
  phone: string;

  @Column({ type: 'text', default: '' })
  document_number: string;

  @Column({ type: 'text', default: '' })
  address_complete: string;

  @Column({ type: 'text', default: '' })
  zip_code: string;

  @OneToOne(() => ScheduleEntity, { cascade: true })
  @JoinColumn({ name: 'schedule_uid' })
  schedule: ScheduleEntity;

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
