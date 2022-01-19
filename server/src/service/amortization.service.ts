import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AmortizationDTO } from '../service/dto/amortization.dto';
import { AmortizationMapper } from '../service/mapper/amortization.mapper';
import { AmortizationRepository } from '../repository/amortization.repository';

const relationshipNames = [];

@Injectable()
export class AmortizationService {
  logger = new Logger('AmortizationService');

  constructor(@InjectRepository(AmortizationRepository) private amortizationEntityRepository: AmortizationRepository) {}

  async findById(id: number): Promise<AmortizationDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.amortizationEntityRepository.findOne(id, options);
    return AmortizationMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<AmortizationDTO>): Promise<AmortizationDTO | undefined> {
    const result = await this.amortizationEntityRepository.findOne(options);
    return AmortizationMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<AmortizationDTO>): Promise<[AmortizationDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.amortizationEntityRepository.findAndCount(options);
    const amortizationEntityDTO: AmortizationDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(amortizationEntity => amortizationEntityDTO.push(AmortizationMapper.fromEntityToDTO(amortizationEntity)));
      resultList[0] = amortizationEntityDTO;
    }
    return resultList;
  }

  async save(amortizationEntityDTO: AmortizationDTO, creator?: string): Promise<AmortizationDTO | undefined> {
    const entity = AmortizationMapper.fromDTOtoEntity(amortizationEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.amortizationEntityRepository.save(entity);
    return AmortizationMapper.fromEntityToDTO(result);
  }

  async update(amortizationEntityDTO: AmortizationDTO, updater?: string): Promise<AmortizationDTO | undefined> {
    const entity = AmortizationMapper.fromDTOtoEntity(amortizationEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.amortizationEntityRepository.save(entity);
    return AmortizationMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.amortizationEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
