import { container } from 'tsyringe';

import IEmployeeRepository from '../repositories/IEmployeeRepository';
import EmployeeRepository from '../repositories/EmployeeRepository';

container.registerSingleton<IEmployeeRepository>(
  'EmployeeRepository',
  EmployeeRepository,
);
