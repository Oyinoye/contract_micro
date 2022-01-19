import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ContractDTO } from '../service/dto/contract.dto';
import { ContractMapper } from '../service/mapper/contract.mapper';
import { ContractRepository } from '../repository/contract.repository';

const relationshipNames = [];

@Injectable()
export class ContractService {
  logger = new Logger('ContractService');

  constructor(@InjectRepository(ContractRepository) private contractEntityRepository: ContractRepository) {}

  async findById(id: number): Promise<ContractDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.contractEntityRepository.findOne(id, options);
    return ContractMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<ContractDTO>): Promise<ContractDTO | undefined> {
    const result = await this.contractEntityRepository.findOne(options);
    return ContractMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<ContractDTO>): Promise<[ContractDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.contractEntityRepository.findAndCount(options);
    const contractEntityDTO: ContractDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(contractEntity => contractEntityDTO.push(ContractMapper.fromEntityToDTO(contractEntity)));
      resultList[0] = contractEntityDTO;
    }
    return resultList;
  }

  async save(contractEntityDTO: ContractDTO, creator?: string): Promise<ContractDTO | undefined> {
    const entity = ContractMapper.fromDTOtoEntity(contractEntityDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.contractEntityRepository.save(entity);
    return ContractMapper.fromEntityToDTO(result);
  }

  async update(contractEntityDTO: ContractDTO, updater?: string): Promise<ContractDTO | undefined> {
    const entity = ContractMapper.fromDTOtoEntity(contractEntityDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.contractEntityRepository.save(entity);
    return ContractMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.contractEntityRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
