import 'reflect-metadata';
import {
  CreateEmployeeService,
  SearchEmployeeByCreationDateService,
} from './index';
import FakeEmployeeRepository from '../repositories/fakes/FakeEmployeeRepository';
import AppError from '../errors/AppError';
import convertStringToDate from '../utils/ConvertStringToDate';

describe('SearchEmployeeByCreationDate', () => {
  const fakeEmployeeRepository = new FakeEmployeeRepository();
  const searchEmployeeByCreationDate = new SearchEmployeeByCreationDateService(
    fakeEmployeeRepository,
  );

  beforeAll(() => {
    const createEmployee = new CreateEmployeeService(fakeEmployeeRepository);
    createEmployee.execute({
      name: 'Vinicius Daniel',
      CPF: '12345678900',
      position: 'Estagiario',
      UF: 'SP',
      salary: 50000,
      status: 'ativo',
      created_at: convertStringToDate('25/10/2020'),
    });
    createEmployee.execute({
      name: 'Thiago',
      CPF: '00123456789',
      position: 'UX Designer',
      UF: 'GO',
      salary: 5000000,
      status: 'ativo',
      created_at: convertStringToDate('25/10/2020'),
    });

    createEmployee.execute({
      name: 'Rodrigo',
      CPF: '42893565301',
      position: 'Dev Jr',
      UF: 'SP',
      salary: 5000,
      status: 'ativo',
      created_at: convertStringToDate('25/12/2020'),
    });
    createEmployee.execute({
      name: 'Hugo',
      CPF: '29842912300',
      position: 'Dev Jr',
      UF: 'RJ',
      salary: 2640,
      status: 'ativo',
      created_at: convertStringToDate('31/12/2020'),
    });
  });

  it('should not be able to search a empty string', async () => {
    await expect(
      searchEmployeeByCreationDate.execute(''),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to search a date that theres is no data', async () => {
    await expect(
      searchEmployeeByCreationDate.execute('01/01/2000'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to search employees by creation date', async () => {
    await expect(
      searchEmployeeByCreationDate.execute('25/10/2020'),
    ).resolves.toMatchObject([
      {
        id: 1,
        name: 'Vinicius Daniel',
        CPF: '12345678900',
        position: 'Estagiario',
        UF: 'SP',
        salary: 50000,
        status: 'ativo',
        created_at: convertStringToDate('25/10/2020'),
      },
      {
        id: 2,
        name: 'Thiago',
        CPF: '00123456789',
        position: 'UX Designer',
        UF: 'GO',
        salary: 5000000,
        status: 'ativo',
        created_at: convertStringToDate('25/10/2020'),
      },
    ]);
  });
});
