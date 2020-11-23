import 'reflect-metadata';
import { CreateEmployeeService, SearchEmployeeByStatusService } from './index';
import FakeEmployeeRepository from '../repositories/fakes/FakeEmployeeRepository';
import AppError from '../errors/AppError';
import convertStringToDate from '../utils/ConvertStringToDate';

describe('SearchEmployeeByStatus', () => {
  const fakeEmployeeRepository = new FakeEmployeeRepository();
  const searchEmployeeByStatus = new SearchEmployeeByStatusService(
    fakeEmployeeRepository,
  );

  beforeAll(() => {
    const createEmployee = new CreateEmployeeService(fakeEmployeeRepository);
    createEmployee.execute({
      name: 'Anna Silva',
      CPF: '12345678900',
      position: 'Analista Sr',
      UF: 'SP',
      salary: 50000,
      status: 'ativo',
      created_at: convertStringToDate('10/02/2020'),
    });

    createEmployee.execute({
      name: 'Annabel Paiva',
      CPF: '12345678900',
      position: 'Analista Jr',
      UF: 'RJ',
      salary: 2600,
      status: 'inativo',
      created_at: convertStringToDate('10/02/2020'),
    });

    createEmployee.execute({
      name: 'Vinicius Daniel',
      CPF: '99911155524',
      position: 'Dev Sr',
      UF: 'SP',
      salary: 2600,
      status: 'BLOQUEADO',
      created_at: convertStringToDate('10/02/2020'),
    });
  });

  it('should not be able to search a empty string', async () => {
    await expect(searchEmployeeByStatus.execute('')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to search a position that not exists', async () => {
    await expect(
      searchEmployeeByStatus.execute('afastado'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to find employees with Status ATIVO', async () => {
    expect(await searchEmployeeByStatus.execute('AtiVO')).toMatchObject([
      {
        id: 1,
        name: 'Anna Silva',
        CPF: '12345678900',
        position: 'Analista Sr',
        UF: 'SP',
        salary: 50000,
        status: 'ativo',
        created_at: convertStringToDate('10/02/2020'),
      },
    ]);
  });

  it('should be able to find employees with Status INATIVO', async () => {
    expect(await searchEmployeeByStatus.execute('inATIVO')).toMatchObject([
      {
        id: 2,
        name: 'Annabel Paiva',
        CPF: '12345678900',
        position: 'Analista Jr',
        UF: 'RJ',
        salary: 2600,
        status: 'inativo',
        created_at: convertStringToDate('10/02/2020'),
      },
    ]);
  });

  it('should be able to find employees with Status BLOQUEADO', async () => {
    expect(await searchEmployeeByStatus.execute('bLoQuEaDo')).toMatchObject([
      {
        id: 3,
        name: 'Vinicius Daniel',
        CPF: '99911155524',
        position: 'Dev Sr',
        UF: 'SP',
        salary: 2600,
        status: 'BLOQUEADO',
        created_at: convertStringToDate('10/02/2020'),
      },
    ]);
  });
});
