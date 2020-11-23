import 'reflect-metadata';
import path from 'path';
import fs from 'fs';
import { ImportEmployeeService } from './index';
import FakeEmployeeRepository from '../repositories/fakes/FakeEmployeeRepository';
import AppError from '../errors/AppError';
import convertStringToDate from '../utils/ConvertStringToDate';

describe('ImportEmployee', () => {
  const fakeEmployeeRepository = new FakeEmployeeRepository();
  const importEmployee = new ImportEmployeeService(fakeEmployeeRepository);
  const importCSV = path.resolve(__dirname, '..', '..', '__tests__');
  const from = path.join(importCSV, 'import_template.txt');
  const dest = path.join(importCSV, 'import_template_copy.txt');
  const err_from = path.join(importCSV, 'error_import_template.txt');
  const err_dest = path.join(importCSV, 'error_import_template_copy.txt');

  beforeAll(() => {
    fs.copyFile(err_from, err_dest, err => {
      if (err) throw new AppError(`${err}`);
      // console.log(`${err_from} was copied to ${err_dest}'`);
    });
    fs.copyFile(from, dest, err => {
      if (err) throw new AppError(`${err}`);
      // console.log(`${from} was copied to ${dest}'`);
    });
  });

  it('should be able to import only employees with valid all data', () => {
    importEmployee
      .execute({
        csvFileName: '../__tests__/error_import_template_copy.txt',
      })
      .then(response => {
        expect(response).toMatchObject([
          {
            CPF: '59984408701',
            UF: 'RO',
            created_at: convertStringToDate('19/04/2017'),
            name: 'Aaron Aaby',
            position: 'AC Sr',
            salary: '5312.70',
            status: 'ATIVO',
          },
        ]);
      })
      .catch(err => {
        console.log(err);
      });
  });

  it('should be able to import employees', async () => {
    importEmployee
      .execute({
        csvFileName: '../__tests__/import_template_copy.txt',
      })
      .then(response => {
        expect(response).toMatchObject([
          {
            CPF: '85235708709',
            UF: 'AP',
            created_at: convertStringToDate('15/04/2017'),
            name: 'Aaron Aaberg',
            position: 'Dev Jr',
            salary: '8965.30',
            status: 'ATIVO',
          },
          {
            CPF: '59984408701',
            UF: 'RO',
            created_at: convertStringToDate('19/04/2017'),
            name: 'Aaron Aaby',
            position: 'AC Sr',
            salary: '5312.70',
            status: 'ATIVO',
          },
          {
            CPF: '51704568080',
            UF: 'RJ',
            created_at: convertStringToDate('03/04/2017'),
            name: 'Abbey Aadland',
            position: 'Analista Sr',
            salary: '5448.60',
            status: 'ATIVO',
          },
        ]);
      })
      .catch(err => {
        console.log(err);
      });
  });
});
