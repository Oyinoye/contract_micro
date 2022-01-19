import { ContractEntity } from '../../domain/contract.entity';
import { ContractDTO } from '../dto/contract.dto';

/**
 * A Contract mapper object.
 */
export class ContractMapper {
  static fromDTOtoEntity(entityDTO: ContractDTO): ContractEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new ContractEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: ContractEntity): ContractDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new ContractDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
