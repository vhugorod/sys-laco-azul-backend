import { Between, EntityRepository, getRepository, Repository } from 'typeorm';
import Employee from '../entities/Employee';

import IEmployeeRepository from './IEmployeeRepository';
import ICreateEmployeeDTO from '../services/ICreateEmployeeDTO';

@EntityRepository(Employee)
export default class EmployeeRepository implements IEmployeeRepository {
  private ormRepository: Repository<Employee>;

  constructor() {
    this.ormRepository = getRepository(Employee);
  }

  public async save(employee: Employee): Promise<Employee> {
    const response = await this.ormRepository.save(employee);
    return response;
  }

  public async remove(CPF: string): Promise<Employee | Employee[]> {
    const result = await this.ormRepository
      .find({ where: { CPF } })
      .then(employee => this.ormRepository.remove(employee));

    return result;
  }

  public async findAll(): Promise<Employee[]> {
    const response = await this.ormRepository.find();
    return response;
  }

  public async create({
    name,
    CPF,
    UF,
    salary,
    position,
    status,
    created_at,
  }: ICreateEmployeeDTO): Promise<Employee> {
    const upperUF = UF.toUpperCase();
    const upperStatus = status.toUpperCase();

    const exists = await this.ormRepository.findOne({ where: { CPF } });

    const employee = exists
      ? this.ormRepository.create({
          ...exists,
          name,
          CPF,
          UF: upperUF,
          position,
          salary,
          status: upperStatus,
          created_at,
        })
      : this.ormRepository.create({
          name,
          CPF,
          UF: upperUF,
          position,
          salary,
          status: upperStatus,
          created_at,
        });

    await this.ormRepository.save(employee);
    return employee;
  }

  public async findByCPF(CPF: string): Promise<Employee | undefined> {
    const findEmployee = await this.ormRepository.findOne({ where: { CPF } });

    return findEmployee;
  }

  public async findByName(name: string): Promise<Employee[]> {
    const findEmployee = await this.ormRepository.find({
      where: `"Employee"."name" LIKE '%${name}%'`,
    });

    return findEmployee;
  }

  public async findByPosition(position: string): Promise<Employee[]> {
    const findEmployee = await this.ormRepository.find({
      where: `"Employee"."position" LIKE '%${position}%'`,
    });

    return findEmployee;
  }

  public async findByStatus(status: string): Promise<Employee[]> {
    const findEmployee = await this.ormRepository.find({
      where: { status },
    });

    return findEmployee;
  }

  public async findByUF(UF: string): Promise<Employee[]> {
    const findEmployee = await this.ormRepository.find({ where: { UF } });

    return findEmployee;
  }

  public async findBySalaryRange(
    min: number,
    max: number,
  ): Promise<Employee[]> {
    const findEmployee = await this.ormRepository.find({
      where: { salary: Between(min, max) },
    });

    return findEmployee;
  }

  public async findByCreatedAt(date: string): Promise<Employee[]> {
    const findEmployee = await this.ormRepository.find({
      where: `"Employee_created_at" LIKE '${date}%'`,
    });

    return findEmployee;
  }

  public async find(): Promise<Employee[]> {
    const employees = await this.ormRepository.find();
    return employees;
  }
}
