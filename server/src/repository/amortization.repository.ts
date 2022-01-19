import { EntityRepository, Repository } from 'typeorm';
import { AmortizationEntity } from '../domain/amortization.entity';

@EntityRepository(AmortizationEntity)
export class AmortizationRepository extends Repository<AmortizationEntity> {}
