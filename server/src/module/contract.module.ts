import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractController } from '../web/rest/contract.controller';
import { ContractRepository } from '../repository/contract.repository';
import { ContractService } from '../service/contract.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContractRepository])],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
