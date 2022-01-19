/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ContractEntity } from './contract.entity';

/**
 * Amortization
 */
@Entity('amortization')
export class AmortizationEntity extends BaseEntity {
  @Column({ name: 'amortization_id', nullable: true })
  amortizationID: string;

  @Column({ name: 'current_month', nullable: true })
  currentMonth: string;

  @Column({ type: 'float', name: 'interest', nullable: true })
  interest: number;

  @Column({ type: 'float', name: 'principal_amount', nullable: true })
  principalAmount: number;

  @Column({ type: 'float', name: 'principal_balance', nullable: true })
  principalBalance: number;

  @OneToOne(type => ContractEntity)
  @JoinColumn()
  contract: ContractEntity;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
