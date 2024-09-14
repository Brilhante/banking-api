import { Request, Response } from "express";
import { prisma } from "../prisma"

class StatementService {

    async deposit(idCheckingAccount: string, amount: number, description: any) {
        try {
 
            if(amount <= 0) {
                throw new Error("Invalid amount.");
            }
            
            const statement = await prisma.statement.create({
                data: {
                    idCheckingAccount,
                    amount,
                    description,
                    type: "credit"
                }
            });
            return statement;
        } catch (error) {
            console.error(`Error creating deposit: ${error}`);
            throw error;
        }
    }

    async getAll(idCheckingAccount: string) {
        try {
            const statement = await prisma.statement.findMany({
                where: {
                    idCheckingAccount
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return statement;
        } catch (error) {
            console.error(`Error getting all statements: ${error}`);
            throw error;
        }
    }

    async getBalance(idCheckingAccount: string) {
        try {
            const statements = await prisma.statement.findMany({
                where: {
                    idCheckingAccount
                }
            });
            let balance = 0;
            for (const statement of statements) {
                if (statement.type === "credit") {
                    balance += statement.amount;
                } else {
                    balance -= statement.amount;
                }
            }
            return balance;
        } catch (error) {
            console.error(`Error getting balance: ${error}`);
            throw error;
        }
    }

    async getStatement(req: Request, res: Response) {
        try {
            const idCheckingAccount = req.params.id;
            const statement = await prisma.statement.findMany({
                where: {idCheckingAccount}
            });
            return res.status(200).json(statement);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error});
        }
    }

    getByPeriod = async (idCheckingAccount: string, startDate: Date, endDate: Date) => {
        try {
            const statements = await prisma.statement.findMany({
                where: {
                    idCheckingAccount,
                    createdAt: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            });
            return statements;
        } catch (error) {
            console.error(`Error getting statements by period: ${error}`);
            throw error;
        }
    }

    async withdraw(idCheckingAccount: string, amount: number, description: any) {
        try {
            const withdraw = await this.createdDebit(idCheckingAccount, amount, description);
            return withdraw;
        } catch (error) {
            console.error(`Error creating withdraw: ${error}`);
            throw error;
        }
    }

    async pix(idCheckingAccount: string, amount: number, description: any) {
        try {
            const pix = await this.createdDebit(idCheckingAccount, amount, `PIX - ${description}`);
            return pix;
        } catch (error) {
            console.error(`Error creating pix: ${error}`);
            throw error;
        }
    }

    async ted(idCheckingAccount: string, amount: number, description: any) {
        try {
            const ted = await this.createdDebit(idCheckingAccount, amount, `TED - ${description}`);
            return ted;
        } catch (error) {
            console.error(`Error creating ted: ${error}`);
            throw error;
        }
    }

    private async createdDebit(idCheckingAccount: string, amount: number, description: any) {
        try {

            if(amount <= 0) {
                throw new Error("Invalid amount.");
            }

            const balance = await this.getBalance(idCheckingAccount);

            if(amount > balance) {
                throw new Error("Insufficient funds.");
            }

            const statement = await prisma.statement.create({
                data: {
                    idCheckingAccount,
                    amount,
                    description,
                    type: "debit"
                }
            });
            return statement;
        } catch (error) {
            console.error(`Error creating debit: ${error}`);
            throw error;
        }
    }
}

export { StatementService }