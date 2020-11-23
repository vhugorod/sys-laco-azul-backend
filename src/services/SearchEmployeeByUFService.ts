import { injectable, inject } from 'tsyringe';
import Employee from '../entities/Employee';
import AppError from '../errors/AppError';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

interface IResponse {
  employees: Employee[];
  total: number;
}
@injectable()
export default class SearchEmployeeByCPFService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  async execute(UF: string): Promise<IResponse> {
    const upperUF = UF.toUpperCase();
    const reg = [
      'RO',
      'AC',
      'AM',
      'RR',
      'PA',
      'AP',
      'TO',
      'MA',
      'PI',
      'CE',
      'RN',
      'PB',
      'PE',
      'AL',
      'SE',
      'BA',
      'MG',
      'ES',
      'RJ',
      'SP',
      'PR',
      'SC',
      'RS',
      'MS',
      'MT',
      'GO',
      'DF',
    ];

    if (!UF) throw new AppError('Value must be required.', 400);
    if (!reg.includes(upperUF)) throw new AppError('Invalid Value to UF');

    const employees = await this.employeeRepository.findByUF(upperUF);

    if (employees.length === 0)
      throw new AppError('No entries found to this value', 404);

    const total = employees.length;

    return { employees, total };
  }
}
