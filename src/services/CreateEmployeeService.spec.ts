import 'reflect-metadata';
import CreateEmployeeService from './CreateEmployeeService';
import FakeEmployeeRepository from '../repositories/fakes/FakeEmployeeRepository';
import AppError from '../errors/AppError';

describe('CreateEmployee', () => {
  const fakeEmployeeRepository = new FakeEmployeeRepository();
  const createEmployee = new CreateEmployeeService(fakeEmployeeRepository);

  it('should be able to create a employee.', async () => {
    const employee = await createEmployee.execute({
      name: 'Vinicius Daniel',
      CPF: '12345678900',
      position: 'CEO',
      UF: 'SP',
      salary: 50000,
      status: 'ativo',
    });

    expect(employee).toHaveProperty('id');
  });

  it('should be able to create a second employee.', async () => {
    const secondEmployee = await createEmployee.execute({
      name: 'Thiago',
      CPF: '00123456789',
      position: 'UX Designer',
      UF: 'GO',
      salary: 5000000,
      status: 'ativo',
    });

    await createEmployee.execute({
      name: 'Rodrigo',
      CPF: '42893565301',
      position: 'Dev Jr',
      UF: 'SP',
      salary: 5000,
      status: 'ativo',
    });
    await createEmployee.execute({
      name: 'Hugo',
      CPF: '29842912300',
      position: 'Dev Jr',
      UF: 'RJ',
      salary: 2640,
      status: 'ativo',
    });

    expect(secondEmployee.id).toBe(2);
    expect(secondEmployee.position).toBe('UX Designer');
  });

  it('should be able to update existent employee.', async () => {
    const secondEmployee = await createEmployee.execute({
      name: 'Thiago',
      CPF: '00123456789',
      position: 'UI Designer',
      UF: 'GO',
      salary: 2920,
      status: 'ativo',
    });

    expect(secondEmployee.salary).toBe(2920);
  });

  it('should not be able to create a employee without all values', async () => {
    const employee = createEmployee.execute({
      name: 'Daniel Vieira',
      CPF: '00100200405',
      position: 'Estagario',
      UF: '',
      salary: 750,
      status: 'ativo',
    });
    await expect(employee).rejects.toBeInstanceOf(AppError);
  });
});
