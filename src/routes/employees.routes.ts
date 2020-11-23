import { Router } from 'express';

import multer from 'multer';
import { container } from 'tsyringe';
import uploadConfig from '../config/upload';

import {
  ShowEmployeeService,
  CreateEmployeeService,
  ImportEmployeeService,
  SearchEmployeeByCPFService,
  DeleteEmployeeService,
  SearchEmployeeByCreationDateService,
  SearchEmployeeByNameService,
  SearchEmployeeByPositionService,
  SearchEmployeeBySalaryRangeService,
  SearchEmployeeByStatusService,
  SearchEmployeeByUFService,
} from '../services';

const employeesRouter = Router();

const upload = multer(uploadConfig);

employeesRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importEmployeeService = container.resolve(ImportEmployeeService);

    const employees = await importEmployeeService.execute({
      csvFileName: request.file.filename,
    });
    return response.json({ employees });
  },
);

employeesRouter.post('/', async (request, response) => {
  const { name, CPF, position, salary, UF, status, created_at } = request.body;

  const createEmployeeService = container.resolve(CreateEmployeeService);

  const employee = await createEmployeeService.execute({
    name,
    CPF,
    position,
    salary,
    UF,
    status,
    created_at,
  });

  return response.json(employee);
});

employeesRouter.delete('/:CPF', async (request, response) => {
  const { CPF } = request.params;

  const deleteEmployeeService = container.resolve(DeleteEmployeeService);

  await deleteEmployeeService.execute(CPF);

  return response.status(204).send();
});

employeesRouter.get('/', async (request, response) => {
  const showEmployeeService = container.resolve(ShowEmployeeService);
  const employees = await showEmployeeService.execute();
  return response.json(employees);
});

employeesRouter.get('/name', async (request, response) => {
  const { value } = request.query;
  const searchEmployeeByNameService = container.resolve(
    SearchEmployeeByNameService,
  );

  const employees = await searchEmployeeByNameService.execute(value as string);

  return response.json(employees);
});

employeesRouter.get('/position', async (request, response) => {
  const { value } = request.query;
  const searchEmployeeByPositionService = container.resolve(
    SearchEmployeeByPositionService,
  );

  const employees = await searchEmployeeByPositionService.execute(
    value as string,
  );

  return response.json(employees);
});

employeesRouter.get('/uf', async (request, response) => {
  const { value } = request.query;
  const searchEmployeeByUFService = container.resolve(
    SearchEmployeeByUFService,
  );

  const { employees, total } = await searchEmployeeByUFService.execute(
    value as string,
  );

  return response.json({ employees, total });
});

employeesRouter.get('/status', async (request, response) => {
  const { value } = request.query;
  const searchEmployeeByStatusService = container.resolve(
    SearchEmployeeByStatusService,
  );

  const employees = await searchEmployeeByStatusService.execute(
    value as string,
  );

  return response.json(employees);
});

employeesRouter.get('/cpf', async (request, response) => {
  const { value } = request.query;
  const searchEmployeeByCPFService = container.resolve(
    SearchEmployeeByCPFService,
  );

  const employee = await searchEmployeeByCPFService.execute(value as string);

  return response.json(employee);
});

employeesRouter.get('/date', async (request, response) => {
  const { value } = request.query;
  const searchEmployeeByCreationDateService = container.resolve(
    SearchEmployeeByCreationDateService,
  );

  const employees = await searchEmployeeByCreationDateService.execute(
    value as string,
  );

  return response.json(employees);
});

employeesRouter.get('/salary', async (request, response) => {
  const { min = 0, max } = request.query;
  const minToNumber = Number(min);
  const maxToNumber = Number(max);

  const searchEmployeeBySalaryRangeService = container.resolve(
    SearchEmployeeBySalaryRangeService,
  );

  const employees = await searchEmployeeBySalaryRangeService.execute({
    min: minToNumber,
    max: maxToNumber,
  });

  return response.json(employees);
});

export default employeesRouter;
