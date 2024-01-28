import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('stocks')
export class StockEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'bigint', generated: 'increment' })
    bid: number;

    @Column({ type: 'text', default: '' })
    item_name: string;

    @Column({ type: 'text', default: '' })
    item_value: string;

    @Column({ type: 'text', default: '' })
    item_description: string;

    @Column({ type: 'text', default: '' })
    item_qnt: string;

    @Column({ type: 'text', default: '' })
    item_validity: string;

    @Column({ type: 'text', default: '' })
    item_picture_url: string;

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