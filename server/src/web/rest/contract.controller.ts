import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post as PostMethod,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ContractDTO } from '../../service/dto/contract.dto';
import { ContractService } from '../../service/contract.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/contracts')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('contracts')
export class ContractController {
  logger = new Logger('ContractController');

  constructor(private readonly contractEntityService: ContractService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ContractDTO,
  })
  async getAll(@Req() req: Request): Promise<ContractDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.contractEntityService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ContractDTO,
  })
  async getOne(@Param('id') id: number): Promise<ContractDTO> {
    return await this.contractEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create contractEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ContractDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() contractEntityDTO: ContractDTO): Promise<ContractDTO> {
    const created = await this.contractEntityService.save(contractEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Contract', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update contractEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ContractDTO,
  })
  async put(@Req() req: Request, @Body() contractEntityDTO: ContractDTO): Promise<ContractDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Contract', contractEntityDTO.id);
    return await this.contractEntityService.update(contractEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update contractEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ContractDTO,
  })
  async putId(@Req() req: Request, @Body() contractEntityDTO: ContractDTO): Promise<ContractDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Contract', contractEntityDTO.id);
    return await this.contractEntityService.update(contractEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete contractEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Contract', id);
    return await this.contractEntityService.deleteById(id);
  }
}
