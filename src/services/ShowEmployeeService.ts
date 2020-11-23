import { injectable, inject } from 'tsyringe';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

@injectable()
export default class ShowEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  async execute(): Promise<Employee[]> {
    const employee = await this.employeeRepository.findAll();
    if (employee.length === 0) throw new AppError('Employee not found.', 404);

    return employee;
  }
}
