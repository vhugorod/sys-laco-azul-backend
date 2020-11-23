import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import employeesRouter from './employees.routes';
import * as swaggerDocument from '../swagger.json';

const routes = Router();

routes.use('/employees', employeesRouter);

routes.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default routes;
