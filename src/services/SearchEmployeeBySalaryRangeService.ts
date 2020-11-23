import { injectable, inject } from 'tsyringe';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

export interface IResquest {
  min?: number;
  max: number;
}

@injectable()
export default class SearchEmployeeBySalaryRangeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  async execute({ min = 0, max }: IResquest): Promise<Employee[]> {
    if (!max) throw new AppError('Max value must be required.', 400);
    if (min > max)
      throw new AppError('Min value cannot be higher than Maximum', 400);
    if (min < 0) throw new AppError('Min value cannot be negative');

    const employee = await this.employeeRepository.findBySalaryRange(min, max);

    if (employee.length === 0) throw new AppError('Employee not found.', 404);

    return employee;
  }
}
