import { UserEntity } from 'src/app/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('receipts')
export class ReceiptEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint', generated: 'increment' })
  bid: number;

  @Column({ type: 'text', default: '' })
  item_name: string;

  @Column({ type: 'text', default: '' })
  item_value: string;

  @Column({ type: 'text', default: '' })
  item_qnt: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.recepits)
  user: UserEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  created_at: Date;
}
