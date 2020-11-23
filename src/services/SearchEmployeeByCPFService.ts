import { injectable, inject } from 'tsyringe';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

@injectable()
export default class SearchEmployeeByCPFService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  async execute(CPF: string): Promise<Employee[]> {
    if (!CPF) throw new AppError('Value must be required.', 400);

    const employee = await this.employeeRepository.findByCPF(CPF);

    if (!employee) throw new AppError('Employee not found.', 404);

    return [employee];
  }
}
