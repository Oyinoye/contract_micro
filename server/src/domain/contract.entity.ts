/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * Contract
 */
@Entity('contract')
export class ContractEntity extends BaseEntity {
  @Column({ name: 'contract_id', nullable: true })
  contractID: string;

  @Column({ name: 'champion_id', nullable: true })
  championID: string;

  @Column({ name: 'vehicle_id', nullable: true })
  vehicleID: string;

  @Column({ type: 'integer', name: 'hp_amount', nullable: true })
  hpAmount: number;

  @Column({ name: 'duration', nullable: true })
  duration: string;

  @Column({ type: 'integer', name: 'balance', nullable: true })
  balance: number;

  @Column({ name: 'status', nullable: true })
  status: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
