import { injectable, inject } from 'tsyringe';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

@injectable()
export default class SearchEmployeeByPositionService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  async execute(position: string): Promise<Employee[] | Employee> {
    if (!position) throw new AppError('Value must be required.', 400);

    const employee = await this.employeeRepository.findByPosition(position);

    if (employee.length === 0) throw new AppError('Employees not found.', 404);

    return employee;
  }
}
