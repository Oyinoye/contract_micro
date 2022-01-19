import { EntityRepository, Repository } from 'typeorm';
import { ContractEntity } from '../domain/contract.entity';

@EntityRepository(ContractEntity)
export class ContractRepository extends Repository<ContractEntity> {}
