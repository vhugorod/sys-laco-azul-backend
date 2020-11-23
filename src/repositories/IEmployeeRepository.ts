import Employee from '../entities/Employee';
import ICreateEmployeeDTO from '../services/ICreateEmployeeDTO';

export default interface IEmployeeRepository {
  create(employee: ICreateEmployeeDTO): Promise<Employee>;
  save(employee: Employee): Promise<Employee>;
  remove(CPF: string): Promise<Employee | Employee[]>;
  findAll(): Promise<Employee[]>;
  findByCPF(CPF: string): Promise<Employee | undefined>;
  findByName(name: string): Promise<Employee[]>;
  findByCreatedAt(date: string): Promise<Employee[]>;
  findByPosition(position: string): Promise<Employee[]>;
  findBySalaryRange(min: number, max: number): Promise<Employee[]>;
  findByStatus(status: string): Promise<Employee[]>;
  findByUF(UF: string): Promise<Employee[]>;
}
