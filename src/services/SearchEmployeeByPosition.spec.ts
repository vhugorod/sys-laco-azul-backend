import 'reflect-metadata';
import {
  CreateEmployeeService,
  SearchEmployeeByPositionService,
} from './index';
import FakeEmployeeRepository from '../repositories/fakes/FakeEmployeeRepository';
import AppError from '../errors/AppError';
import convertStringToDate from '../utils/ConvertStringToDate';

describe('SearchEmployeeByPosition', () => {
  const fakeEmployeeRepository = new FakeEmployeeRepository();
  const searchEmployeeByPosition = new SearchEmployeeByPositionService(
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
  });

  it('should not be able to search a empty string', async () => {
    await expect(searchEmployeeByPosition.execute('')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to search a position that not exists', async () => {
    await expect(
      searchEmployeeByPosition.execute('Dev Semi-novo'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to find employees', async () => {
    expect(await searchEmployeeByPosition.execute('Anali')).toMatchObject([
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
});
