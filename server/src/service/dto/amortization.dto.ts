/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ContractDTO } from './contract.dto';

/**
 * A AmortizationDTO object.
 */
export class AmortizationDTO extends BaseDTO {
  @ApiModelProperty({ description: 'amortizationID field', required: false })
  amortizationID: string;

  @ApiModelProperty({ description: 'currentMonth field', required: false })
  currentMonth: string;

  @ApiModelProperty({ description: 'interest field', required: false })
  interest: number;

  @ApiModelProperty({ description: 'principalAmount field', required: false })
  principalAmount: number;

  @ApiModelProperty({ description: 'principalBalance field', required: false })
  principalBalance: number;

  @ApiModelProperty({ type: ContractDTO, description: 'contract relationship' })
  contract: ContractDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
