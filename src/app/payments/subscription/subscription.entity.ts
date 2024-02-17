import { CompanyEntity } from 'src/app/company/company.entity';
import { UserEntity } from 'src/app/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';


@Entity('subscriptions')
export class SubscriptionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint', generated: 'increment' })
  bid: number;

  @Column({ type: 'text', default: '' })
  plan: 'basic' | 'pro';

  @Column({ type: 'text', default: '' })
  subscription_id: string;

  @Column({ type: 'text', default: '' })
  customer_id: string;

  @Column({ type: 'text', default: '' })
  next_payment_date: Date;

  @Column({ type: 'text', default: '' })
  inital_payment_date: Date;

  @Column({ type: 'text', default: '' })
  create_payment_date: Date;

  @OneToOne(() => CompanyEntity, (company: CompanyEntity) => company.subscription)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.subscription)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

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

  @DeleteDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  deleted_at: Date;
}
