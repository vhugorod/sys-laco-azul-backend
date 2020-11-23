import 'reflect-metadata';
import CreateEmployeeService from './CreateEmployeeService';
import FakeEmployeeRepository from '../repositories/fakes/FakeEmployeeRepository';
import { DeleteEmployeeService } from '.';
import AppError from '../errors/AppError';

describe('CreateEmployee', () => {
  const fakeEmployeeRepository = new FakeEmployeeRepository();
  const createEmployee = new CreateEmployeeService(fakeEmployeeRepository);
  const deleteEmployee = new DeleteEmployeeService(fakeEmployeeRepository);

  beforeAll(() => {
    createEmployee.execute({
      name: 'Vinicius Daniel',
      CPF: '12345678900',
      position: 'CEO',
      UF: 'SP',
      salary: 50000,
      status: 'ativo',
    });
    createEmployee.execute({
      name: 'Thiago',
      CPF: '00123456789',
      position: 'UX Designer',
      UF: 'GO',
      salary: 5000000,
      status: 'ativo',
    });

    createEmployee.execute({
      name: 'Rodrigo',
      CPF: '42893565301',
      position: 'Dev Jr',
      UF: 'SP',
      salary: 5000,
      status: 'ativo',
    });
    createEmployee.execute({
      name: 'Hugo',
      CPF: '29842912300',
      position: 'Dev Jr',
      UF: 'RJ',
      salary: 2640,
      status: 'ativo',
    });
  });

  it('should not be able to delete with a invalid value.', async () => {
    expect(deleteEmployee.execute('')).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete inexistent employee.', async () => {
    await expect(deleteEmployee.execute('99988877711')).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able to delete existent employee.', async () => {
    expect(await deleteEmployee.execute('29842912300')).toMatchObject([
      {
        id: 4,
        name: 'Hugo',
        CPF: '29842912300',
        position: 'Dev Jr',
        UF: 'RJ',
        salary: 2640,
        status: 'ativo',
      },
    ]);
  });
});
