import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ContractDTO } from '../src/service/dto/contract.dto';
import { ContractService } from '../src/service/contract.service';

describe('Contract Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId',
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    deleteById: (): any => entityMock,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(ContractService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all contracts ', async () => {
    const getEntities: ContractDTO[] = (await request(app.getHttpServer()).get('/api/contracts').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET contracts by id', async () => {
    const getEntity: ContractDTO = (
      await request(app.getHttpServer())
        .get('/api/contracts/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create contracts', async () => {
    const createdEntity: ContractDTO = (await request(app.getHttpServer()).post('/api/contracts').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update contracts', async () => {
    const updatedEntity: ContractDTO = (await request(app.getHttpServer()).put('/api/contracts').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update contracts from id', async () => {
    const updatedEntity: ContractDTO = (
      await request(app.getHttpServer())
        .put('/api/contracts/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE contracts', async () => {
    const deletedEntity: ContractDTO = (
      await request(app.getHttpServer())
        .delete('/api/contracts/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
