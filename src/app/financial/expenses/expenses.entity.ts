import { CompanyEntity } from 'src/app/company/company.entity';
import { UserEntity } from 'src/app/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('expenses')
export class ExpenseEntity extends BaseEntity {
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

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.expenses)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  created_at: Date;
}
