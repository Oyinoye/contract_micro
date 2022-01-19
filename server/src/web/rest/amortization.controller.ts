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
import { AmortizationDTO } from '../../service/dto/amortization.dto';
import { AmortizationService } from '../../service/amortization.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/amortizations')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('amortizations')
export class AmortizationController {
  logger = new Logger('AmortizationController');

  constructor(private readonly amortizationEntityService: AmortizationService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AmortizationDTO,
  })
  async getAll(@Req() req: Request): Promise<AmortizationDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.amortizationEntityService.findAndCount({
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
    type: AmortizationDTO,
  })
  async getOne(@Param('id') id: number): Promise<AmortizationDTO> {
    return await this.amortizationEntityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create amortizationEntity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AmortizationDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() amortizationEntityDTO: AmortizationDTO): Promise<AmortizationDTO> {
    const created = await this.amortizationEntityService.save(amortizationEntityDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Amortization', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update amortizationEntity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AmortizationDTO,
  })
  async put(@Req() req: Request, @Body() amortizationEntityDTO: AmortizationDTO): Promise<AmortizationDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Amortization', amortizationEntityDTO.id);
    return await this.amortizationEntityService.update(amortizationEntityDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update amortizationEntity with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AmortizationDTO,
  })
  async putId(@Req() req: Request, @Body() amortizationEntityDTO: AmortizationDTO): Promise<AmortizationDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Amortization', amortizationEntityDTO.id);
    return await this.amortizationEntityService.update(amortizationEntityDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete amortizationEntity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Amortization', id);
    return await this.amortizationEntityService.deleteById(id);
  }
}
