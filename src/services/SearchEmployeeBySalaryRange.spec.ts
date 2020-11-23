import 'reflect-metadata';
import {
  CreateEmployeeService,
  SearchEmployeeBySalaryRangeService,
} from './index';
import FakeEmployeeRepository from '../repositories/fakes/FakeEmployeeRepository';
import AppError from '../errors/AppError';
import convertStringToDate from '../utils/ConvertStringToDate';

describe('SearchEmployeeBySalaryRange', () => {
  const fakeEmployeeRepository = new FakeEmployeeRepository();
  const searchEmployeeBySalaryRange = new SearchEmployeeBySalaryRangeService(
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
      salary: 6450,
      status: 'BLOQUEADO',
      created_at: convertStringToDate('10/02/2020'),
    });
  });

  it('should not be able to search a salary with min value higher than max value', async () => {
    await expect(
      searchEmployeeBySalaryRange.execute({ min: 10, max: 5 }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to search a salary with a negative min value', async () => {
    await expect(
      searchEmployeeBySalaryRange.execute({ min: -1, max: 2601 }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to search a salary without a valid max value', async () => {
    await expect(
      searchEmployeeBySalaryRange.execute({ max: 0 }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to search a salary when theres is no data', async () => {
    await expect(
      searchEmployeeBySalaryRange.execute({ max: 1 }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to search a salary without a min value', async () => {
    await expect(
      searchEmployeeBySalaryRange.execute({ max: 2601 }),
    ).resolves.toMatchObject([
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

  it('should be able to search a salary without a min value', async () => {
    await expect(
      searchEmployeeBySalaryRange.execute({ min: 2601, max: 49999 }),
    ).resolves.toMatchObject([
      {
        id: 3,
        name: 'Vinicius Daniel',
        CPF: '99911155524',
        position: 'Dev Sr',
        UF: 'SP',
        salary: 6450,
        status: 'BLOQUEADO',
        created_at: convertStringToDate('10/02/2020'),
      },
    ]);
  });
});
