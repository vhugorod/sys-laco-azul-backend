import { injectable, inject } from 'tsyringe';
import csvParse from 'csv-parse';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';

import convertStringToDate from '../utils/ConvertStringToDate';

import IEmployeeRepository from '../repositories/IEmployeeRepository';
import ICreateEmployeeDTO from './ICreateEmployeeDTO';

interface IRequest {
  csvFileName: string;
}

@injectable()
class ImportEmployeeServive {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
  ) {}

  async execute({ csvFileName }: IRequest): Promise<ICreateEmployeeDTO[]> {
    const employees: ICreateEmployeeDTO[] = [];

    const csvFile = path.join(uploadConfig.directory, csvFileName);

    const stream = fs.createReadStream(csvFile);
    const parser = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
      skipEmptyLines: true,
      delimiter: ';',
    });
    const csv = stream.pipe(parser);

    csv.on('data', line => {
      const [created_at, position, CPF, name, UF, salary, status] = line;

      if (!position || !CPF || !name || !UF || !salary || !status) return;

      employees.push({
        created_at: convertStringToDate(created_at),
        position,
        CPF,
        name,
        UF,
        salary,
        status,
      });
    });

    await new Promise(resolve => csv.on('end', resolve));

    await Promise.all(
      employees.map(employee => this.employeeRepository.create(employee)),
    );

    await fs.promises.unlink(csvFile);

    return employees;
  }
}

export default ImportEmployeeServive;
