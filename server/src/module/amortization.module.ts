import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmortizationController } from '../web/rest/amortization.controller';
import { AmortizationRepository } from '../repository/amortization.repository';
import { AmortizationService } from '../service/amortization.service';

@Module({
  imports: [TypeOrmModule.forFeature([AmortizationRepository])],
  controllers: [AmortizationController],
  providers: [AmortizationService],
  exports: [AmortizationService],
})
export class AmortizationModule {}
