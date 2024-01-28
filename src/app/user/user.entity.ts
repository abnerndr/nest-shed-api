import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ExpenseEntity } from "../financial/expenses/expenses.entity";
import { ReceiptEntity } from "../financial/receipt/receipt.entity";

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'bigint', generated: 'increment' })
    bid: number;

    @Column({ type: 'text', default: '' })
    full_name: string;

    @Column({ type: 'text', default: '' })
    email: string;

    @Column({ type: 'text', default: '' })
    cpf: string;

    @Column({ type: 'text', default: '' })
    cnpj: string;

    @Column({ type: 'text', default: '' })
    phone: string;

    @Column({ type: 'text', default: '' })
    photo_url: string;

    @Column({ type: 'text', default: '' })
    address_complete: string;

    @Column({ type: 'text', default: '' })
    zip_code: string;

    @Column({ type: 'text', default: '' })
    bussiness_name: string;

    @Column({ type: 'text', default: '' })
    bussiness_picture_url: string;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @Column({ type: 'boolean', default: false })
    payment_is_valid: boolean;

    @Column({ type: 'text', default: '' })
    last_payment_date: string;

    @OneToMany(() => ExpenseEntity, (expenses: ExpenseEntity) => expenses.user)
    expenses: ExpenseEntity[]

    @OneToMany(() => ReceiptEntity, (recepits: ReceiptEntity) => recepits.user)
    recepits: ReceiptEntity[]

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    created_at: Date;


    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updated_at: Date;
}