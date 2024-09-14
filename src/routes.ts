import { Router } from "express";
import { CheckingAccountController } from "./controllers/CheckingAccountController";
import { StatementController } from "./controllers/StatementController";

const routes = Router();

const checkingAccountController = new CheckingAccountController();
const statementController = new StatementController();

const path = "/checkingaccounts";

routes.get(path, checkingAccountController.findAll);

routes.get(`${path}/:id`, checkingAccountController.findById);

routes.post(path, checkingAccountController.created);

routes.put(`${path}/:id`, checkingAccountController.verifyIfExists, checkingAccountController.update);

routes.delete(`${path}/:id`, checkingAccountController.verifyIfExists, checkingAccountController.delete);

routes.post(`${path}/:id/deposit`, checkingAccountController.verifyIfExists, statementController.deposit);

routes.get(`${path}/:id/statement`, checkingAccountController.verifyIfExists, statementController.getStatement);

routes.get(`${path}/:id/balance`, checkingAccountController.verifyIfExists, statementController.getBalance);

routes.post(`${path}/:id/withdraw`, checkingAccountController.verifyIfExists, statementController.withdraw);

routes.get(`${path}/:id/statement/period`, checkingAccountController.verifyIfExists, statementController.getByPeriod );

routes.post(`${path}/:id/pix`, checkingAccountController.verifyIfExists, statementController.pix);

routes.post(`${path}/:id/ted`, checkingAccountController.verifyIfExists, statementController.ted);

export { routes }