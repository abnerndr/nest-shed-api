import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { ExpenseEntity } from '../financial/expenses/expenses.entity';
import { ReceiptEntity } from '../financial/receipt/receipt.entity';
import { AddressProps, Permission, Role } from './user.interface';
import { SubscriptionEntity } from '../payments/subscription/subscription.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint', generated: 'increment' })
  bid: number;

  @Column({ type: 'text', default: '' })
  full_name: string;

  @Column({ type: 'text', default: '' })
  email: string;

  @Column({ type: 'text', default: '' })
  password: string;

  @Column({ type: 'text', default: '' })
  document_number: string;

  @Column({ type: 'text', default: '' })
  phone: string;

  @Column({ type: 'text', default: '' })
  photo_url: string;

  @Column({ type: 'text', default: '' })
  customer_id: string;

  @Column({ type: 'text', default: '' })
  payment_method_id: string;

  @Column({ type: 'jsonb', default: {} as AddressProps })
  address: AddressProps;

  @Column({ type: 'text', default: '' })
  postal_code: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'text', default: '' })
  role: Role;

  @Column({ type: 'jsonb', default: [] })
  permissions: Permission[];

  @ManyToOne(() => CompanyEntity, (company: CompanyEntity) => company.users)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(() => ExpenseEntity, (expenses: ExpenseEntity) => expenses.user)
  expenses: ExpenseEntity[];

  @OneToMany(() => ReceiptEntity, (recepits: ReceiptEntity) => recepits.user)
  recepits: ReceiptEntity[];

  @OneToOne(() => SubscriptionEntity, (subscription: SubscriptionEntity) => subscription.user)
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
