import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { SubscriptionEntity } from '../payments/subscription/subscription.entity';

@Entity('companies')
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint', generated: 'increment' })
  bid: number;

  @Column({ type: 'text', default: '' })
  name: string;

  @Column({ type: 'text', default: '' })
  document_number: string;

  @Column({ type: 'text', default: '' })
  phone: string;

  @Column({ type: 'text', default: '' })
  email: string;

  @Column({ type: 'text', default: '' })
  address: string;

  @Column({ type: 'text', default: '' })
  zip_code: string;

  @Column({ type: 'text', default: '' })
  photo_url: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  payment_is_valid: boolean;

  @Column({ type: 'text', default: '' })
  last_payment_date: string;

  @OneToMany(() => UserEntity, (users: UserEntity) => users.company)
  users: UserEntity[];

  @OneToOne(() => SubscriptionEntity, (subscription: SubscriptionEntity) => subscription.company)
  @JoinColumn({ name: 'signature_id' })
  subscription: SubscriptionEntity;

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
