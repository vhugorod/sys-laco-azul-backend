import { isEqual, parseISO } from 'date-fns';
import 'reflect-metadata';
import Employee from '../../entities/Employee';
import AppError from '../../errors/AppError';

interface IEmployeeDTO {
  id?: number;
  name: string;
  CPF: string;
  UF: string;
  position: string;
  salary: number;
  status: string;
  created_at?: Date;
}

export default class FakeEmployeeRepository {
  private employees: Employee[] = [];

  public async findByCPF(CPF: string): Promise<Employee | undefined> {
    const findEmployee = this.employees.find(employee => employee.CPF === CPF);
    return findEmployee;
  }

  public async create({
    id,
    name,
    CPF,
    UF,
    salary,
    position,
    status,
    created_at = new Date(),
  }: IEmployeeDTO): Promise<Employee> {
    const employee = new Employee();
    let newId;
    if (!id)
      newId =
        this.employees.length === 0
          ? 1
          : this.employees[this.employees.length - 1].id + 1;

    Object.assign(employee, {
      id: newId,
      name,
      CPF,
      UF,
      salary,
      position,
      status,
      created_at,
    });

    this.employees.push(employee);
    return employee;
  }

  async save(employee: Employee): Promise<Employee> {
    return employee;
  }

  async remove(CPF: string): Promise<Employee | Employee[]> {
    this.employees.filter(employee => employee.CPF !== CPF);
    const removed = this.employees.filter(employee => employee.CPF === CPF);
    return removed;
  }

  async findAll(): Promise<Employee[]> {
    return this.employees;
  }

  async findByName(name: string): Promise<Employee[]> {
    const reg = new RegExp(`${name}`);
    const findEmployee = this.employees.filter(employee =>
      employee.name.match(reg),
    );
    return findEmployee;
  }

  async findByCreatedAt(date: string): Promise<Employee[]> {
    const findEmployee = this.employees.filter(employee => {
      const parsedDate = parseISO(date);
      return isEqual(parsedDate, employee.created_at);
    });
    return findEmployee;
  }

  async findByPosition(position: string): Promise<Employee[]> {
    const reg = new RegExp(`${position.toUpperCase()}`);
    const findEmployee = this.employees.filter(employee =>
      employee.position.toUpperCase().match(reg),
    );
    return findEmployee;
  }

  // min <= salary <= max
  async findBySalaryRange(min: number, max: number): Promise<Employee[]> {
    const findEmployee = this.employees.filter(
      employee => min <= employee.salary && employee.salary <= max,
    );
    return findEmployee;
  }

  async findByStatus(status: string): Promise<Employee[]> {
    const findEmployee = this.employees.filter(
      employee => employee.status.toUpperCase() === status.toUpperCase(),
    );

    return findEmployee;
  }

  async findByUF(UF: string): Promise<Employee[]> {
    const findEmployee = this.employees.filter(employee => employee.UF === UF);
    return findEmployee;
  }
}
