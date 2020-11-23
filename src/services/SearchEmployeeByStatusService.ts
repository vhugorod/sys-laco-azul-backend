import { injectable, inject } from 'tsyringe';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

@injectable()
export default class SearchEmployeeByStatusService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  async execute(status: string): Promise<Employee[]> {
    const upperStatus = status.toUpperCase();

    if (!status) throw new AppError('Value must be required.', 400);

    const employee = await this.employeeRepository.findByStatus(upperStatus);

    if (employee.length === 0) throw new AppError('Employee not found.', 404);

    return employee;
  }
}
