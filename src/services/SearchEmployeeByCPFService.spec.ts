import 'reflect-metadata';
import { CreateEmployeeService, SearchEmployeeByCPFService } from './index';
import FakeEmployeeRepository from '../repositories/fakes/FakeEmployeeRepository';
import AppError from '../errors/AppError';

describe('SearchEmployeeByCPF', () => {
  const fakeEmployeeRepository = new FakeEmployeeRepository();
  const searchEmployeeByCPF = new SearchEmployeeByCPFService(
    fakeEmployeeRepository,
  );

  beforeEach(() => {
    const createEmployee = new CreateEmployeeService(fakeEmployeeRepository);
    createEmployee.execute({
      name: 'Vinicius Daniel',
      CPF: '12345678900',
      position: 'CEO',
      UF: 'SP',
      salary: 50000,
      status: 'ativo',
    });
  });

  it('should not be able to search a empty string', async () => {
    await expect(searchEmployeeByCPF.execute('')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to search search a employee that not exists', async () => {
    await expect(
      searchEmployeeByCPF.execute('12245678900'),
    ).rejects.toMatchObject({
      message: 'Employee not found.',
      statusCode: 404,
    });
  });

  it('should be able to find a employee', async () => {
    expect(await searchEmployeeByCPF.execute('12345678900')).toMatchObject([
      {
        name: 'Vinicius Daniel',
        CPF: '12345678900',
        position: 'CEO',
        UF: 'SP',
        salary: 50000,
        status: 'ativo',
      },
    ]);
  });
});
