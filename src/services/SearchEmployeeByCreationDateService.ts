import { injectable, inject } from 'tsyringe';
import { formatISO } from 'date-fns';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';

import convertStringToDate from '../utils/ConvertStringToDate';
import validateDate from '../utils/ValidateDate';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

@injectable()
export default class SearchEmployeeByCPFService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  async execute(date: string): Promise<Employee[]> {
    if (!validateDate(date)) throw new AppError('Invalid Date format');
    const stringToDate = convertStringToDate(date);

    const formattedDate = formatISO(stringToDate, { representation: 'date' });

    const employee = await this.employeeRepository.findByCreatedAt(
      formattedDate,
    );

    if (employee.length === 0) throw new AppError('Employees not found.', 404);

    return employee;
  }
}
