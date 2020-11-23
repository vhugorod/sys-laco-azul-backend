import 'reflect-metadata';
import { CreateEmployeeService, SearchEmployeeByUFService } from './index';
import FakeEmployeeRepository from '../repositories/fakes/FakeEmployeeRepository';
import AppError from '../errors/AppError';
import convertStringToDate from '../utils/ConvertStringToDate';

describe('SearchEmployeeByUF', () => {
  const fakeEmployeeRepository = new FakeEmployeeRepository();
  const searchEmployeeByUF = new SearchEmployeeByUFService(
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
    await expect(searchEmployeeByUF.execute('')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to search a UF that not exists', async () => {
    expect(searchEmployeeByUF.execute('LS')).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to search a UF that there is no data', async () => {
    expect(searchEmployeeByUF.execute('GO')).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to find employees by UF', async () => {
    expect(await searchEmployeeByUF.execute('SP')).toMatchObject({
      employees: [
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
      ],
      total: 2,
    });
  });

  it('should be able to find a employee by UF', async () => {
    expect(await searchEmployeeByUF.execute('RJ')).toMatchObject({
      employees: [
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
      ],
      total: 1,
    });
  });
});
