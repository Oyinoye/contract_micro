import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { AmortizationDTO } from '../src/service/dto/amortization.dto';
import { AmortizationService } from '../src/service/amortization.service';

describe('Amortization Controller', () => {
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
      .overrideProvider(AmortizationService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all amortizations ', async () => {
    const getEntities: AmortizationDTO[] = (await request(app.getHttpServer()).get('/api/amortizations').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET amortizations by id', async () => {
    const getEntity: AmortizationDTO = (
      await request(app.getHttpServer())
        .get('/api/amortizations/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create amortizations', async () => {
    const createdEntity: AmortizationDTO = (await request(app.getHttpServer()).post('/api/amortizations').send(entityMock).expect(201))
      .body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update amortizations', async () => {
    const updatedEntity: AmortizationDTO = (await request(app.getHttpServer()).put('/api/amortizations').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update amortizations from id', async () => {
    const updatedEntity: AmortizationDTO = (
      await request(app.getHttpServer())
        .put('/api/amortizations/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE amortizations', async () => {
    const deletedEntity: AmortizationDTO = (
      await request(app.getHttpServer())
        .delete('/api/amortizations/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
