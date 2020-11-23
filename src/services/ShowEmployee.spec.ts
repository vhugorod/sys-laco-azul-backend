import 'reflect-metadata';
import { CreateEmployeeService, ShowEmployeeService } from './index';
import FakeEmployeeRepository from '../repositories/fakes/FakeEmployeeRepository';
import AppError from '../errors/AppError';
import convertStringToDate from '../utils/ConvertStringToDate';

describe('ShowEmployee', () => {
  const fakeEmployeeRepository = new FakeEmployeeRepository();
  const showEmployee = new ShowEmployeeService(fakeEmployeeRepository);

  it('should not be able to list when there is no emplooyes', async () => {
    await expect(showEmployee.execute()).rejects.toBeInstanceOf(AppError);
  });

  afterEach(() => {
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

  it('should be able to list all employees', async () => {
    expect(await showEmployee.execute()).toMatchObject(
      expect.arrayContaining([
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
      ]),
    );
  });
});
