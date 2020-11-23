import { injectable, inject } from 'tsyringe';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

@injectable()
export default class DeleteEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  public async execute(CPF: string): Promise<Employee | Employee[]> {
    if (!CPF) throw new AppError('CPF must be required');
    const result = await this.employeeRepository.remove(CPF);

    if (Array.isArray(result) && result.length === 0)
      throw new AppError('Employees not found.', 404);
    return result;
  }
}
