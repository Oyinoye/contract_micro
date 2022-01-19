import { AmortizationEntity } from '../../domain/amortization.entity';
import { AmortizationDTO } from '../dto/amortization.dto';

/**
 * A Amortization mapper object.
 */
export class AmortizationMapper {
  static fromDTOtoEntity(entityDTO: AmortizationDTO): AmortizationEntity {
    if (!entityDTO) {
      return;
    }
    let entity = new AmortizationEntity();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: AmortizationEntity): AmortizationDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new AmortizationDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
