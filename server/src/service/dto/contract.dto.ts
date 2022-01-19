/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A ContractDTO object.
 */
export class ContractDTO extends BaseDTO {
  @ApiModelProperty({ description: 'contractID field', required: false })
  contractID: string;

  @ApiModelProperty({ description: 'championID field', required: false })
  championID: string;

  @ApiModelProperty({ description: 'vehicleID field', required: false })
  vehicleID: string;

  @ApiModelProperty({ description: 'hpAmount field', required: false })
  hpAmount: number;

  @ApiModelProperty({ description: 'duration field', required: false })
  duration: string;

  @ApiModelProperty({ description: 'balance field', required: false })
  balance: number;

  @ApiModelProperty({ description: 'status field', required: false })
  status: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
