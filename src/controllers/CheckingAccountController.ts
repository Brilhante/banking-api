import { NextFunction, Request, Response } from "express";
import { CheckingAccountService } from "../services/CheckingAccountService";
import { handleError } from "../Utils";


class CheckingAccountController {

    private checkingAccountService:  CheckingAccountService;

    constructor(){
        this.checkingAccountService = new CheckingAccountService();
    }

    created = async (req: Request, res: Response) => {
        try {
            const { name, email, number } = req.body
            const validation = this.isValidNameAndEmailAndNumber(name, email, number);

            if (!validation) {
                return res.status(400).json({msg: "Name, email and number are required"});
            }

            const checkingAccount = await this.checkingAccountService.create(name, email, number);
            
            return res.status(201).json(checkingAccount);
        } catch (error) {
            handleError(res, error, "Error creating checkingAccount");
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const { name, email, number } = req.body
            const validation = this.isValidNameAndEmailAndNumber(name, email, number);
            if(!validation) {
                return res.status(400).json({msg: "Name, email and number are required"});
            }
            const checkingAccount = await this.checkingAccountService.update(id, name, email, number);

            return res.status(200).json(checkingAccount);
        } catch (error) {

        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            await this.checkingAccountService.delete(id);
            return res.status(204).json({});
        } catch (error) {
            handleError(res, error, "Error deleting checkingAccount");
        }
    }

    findAll(req: Request, res: Response) {
        try {
            return res.status(200).json(this.checkingAccountService.getAll());
        } catch (error) {
            handleError(res, error, "Error getting checkingAccounts");
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const checkingAccount = await this.checkingAccountService.getById(id);
    
            if(!checkingAccount) {
                return res.status(404).json({error: "CheckingAccount not found."});
            }
            return res.status(200).json(checkingAccount);
            
        } catch (error) {
            handleError(res, error, "Error getting checkingAccount");
        }
    }

    private isValidNameAndEmailAndNumber(name: any, email: any, number: any) {
        if (typeof name !== "string" || name.trim().length === 0) {
            return {isValid: false, msg: "Name is required"};
        }

        if(typeof email !== "string" || email.trim().length === 0) {
            return {isValid: false, msg: "Email is required"};
        }
        if(typeof number !== "string" || number.trim().length === 0) {
            return {isValid: false, msg: "Number is required"};
        }

        return {isValid: true}; 
    }

    async verifyIfExists(req: Request, res:Response, next:NextFunction) {
        try {
            const id = req.params.id;
            const checkingAccount = await this.checkingAccountService.getById(id);

            if(!checkingAccount) {
                return res.status(404).json({error: "CheckingAccount not found."});
            }

            return next();
        } catch (error) {
            handleError(res, error, "Error verify if exists checkingAccount");
        }
    }
}

export { CheckingAccountController }