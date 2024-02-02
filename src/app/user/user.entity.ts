import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { CompanyEntity } from '../company/company.entity';
import { ExpenseEntity } from '../financial/expenses/expenses.entity';
import { ReceiptEntity } from '../financial/receipt/receipt.entity';

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
  address: string;

  @Column({ type: 'text', default: '' })
  zip_code: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @ManyToOne(() => CompanyEntity, (company: CompanyEntity) => company.users)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity

  @OneToMany(() => ExpenseEntity, (expenses: ExpenseEntity) => expenses.user)
  expenses: ExpenseEntity[];

  @OneToMany(() => ReceiptEntity, (recepits: ReceiptEntity) => recepits.user)
  recepits: ReceiptEntity[];

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
