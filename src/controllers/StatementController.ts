import { Request, Response } from "express";
import { StatementService } from "../services/StatementService";
import { handleError } from "../Utils";

class StatementController {
  private statementService: StatementService;

  constructor() {
    this.statementService = new StatementService();
  }

  deposit = async (req: Request, res: Response) => {
    try {
      const idCheckingAccount = req.params.id;
      const { amount, description } = req.body;
      const validation = this.isValidAmountAndDescription(amount, description);

      if (!validation.isValid) {
        return res.status(400).json({ error: validation.msg });
      }

      const statement = await this.statementService.deposit(
        idCheckingAccount,
        amount,
        description
      );
      return res.status(201).json(statement);
    } catch (error) {
      return handleError(res, error, "Error creating deposit");
    }
  };

  getStatement = async (req: Request, res: Response) => {
    try {
      const idCheckingAccount = req.params.id;
      const statement = await this.statementService.getAll(idCheckingAccount);
      return res.status(200).json(statement);
    } catch (error) {
      return handleError(res, error, "Error getting statement");
    }
  };

  getBalance = async (req: Request, res: Response) => {
    try {
      const idCheckingAccount = req.params.id;
      const balance = await this.statementService.getBalance(idCheckingAccount);
      return res.status(200).json({ balance });
    } catch (error) {
      return handleError(res, error, "Error getting balance");
    }
  };

  withdraw = async (req: Request, res: Response) => {
    try {
      const idCheckingAccount = req.params.id;
      const { amount, description } = req.body;
      const validation = this.isValidAmountAndDescription(amount, description);

      if (!validation.isValid) {
        return res.status(400).json({ error: validation.msg });
      }

      const withdraw = await this.statementService.withdraw(
        idCheckingAccount,
        amount,
        description
      );
      return res.status(201).json(withdraw);
    } catch (error) {
      return handleError(res, error, "Error creating withdraw");
    }
  };

  getByPeriod = async (req: Request, res: Response) => {
    try {
      const idCheckingAccount = req.params.id;
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res
          .status(400)
          .json({ error: "Start date and end date are required" });
      }

      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ error: "Invalid date format" });
      }

      const statement = await this.statementService.getByPeriod(
        idCheckingAccount,
        start,
        end
      );
      return res.status(200).json(statement);
    } catch (error) {
      if (error instanceof Error) {
        return handleError(
          res,
          error,
          "Error getting statement by period"
        );
      }
    }
  };

  pix = async (req: Request, res: Response) => {
    try {
      const idCheckingAccount = req.params.id;
      const { amount, description } = req.body;
      const validation = this.isValidAmountAndDescription(amount, description);

      if (!validation.isValid) {
        return res.status(400).json({ error: validation.msg });
      }

      const pix = await this.statementService.pix(
        idCheckingAccount,
        amount,
        description
      );
      return res.status(201).json(pix);
    } catch (error) {
      return handleError(res, error, "Error creating pix");
    }
  };

  ted = async (req: Request, res: Response) => {
    try {
      const idCheckingAccount = req.params.id;
      const { amount, description } = req.body;
      const validation = this.isValidAmountAndDescription(amount, description);

      if (!validation.isValid) {
        return res.status(400).json({ error: validation.msg });
      }

      const ted = await this.statementService.ted(
        idCheckingAccount,
        amount,
        description
      );
      return res.status(201).json(ted);
    } catch (error) {
      return handleError(res, error, "Error creating ted");
    }
  };


  private isValidAmountAndDescription(amount: any, description: any) {
    if (typeof amount !== "number" || amount <= 0) {
      return { isValid: false, msg: "Amount must be a positive number." };
    }

    if (typeof description !== "string" || description.trim().length === 0) {
      return { isValid: false, msg: "Description must be a non-empty string." };
    }

    return { isValid: true };
  }
}

export { StatementController };
