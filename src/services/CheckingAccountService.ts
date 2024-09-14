import { prisma } from "../prisma";

class CheckingAccountService {

    async create(name: string, email: string, number: string) {
        try {
            const checkingAccount = await prisma.checkingAccount.create({
                data: {
                    name,
                    email,
                    number
                }
            });
            return checkingAccount;
        } catch (error) {
            console.error(`Error creating checkingAccount. ${error}`);
            return error;
        }
    }

    async update(id: string, name: string, email: string, number: string) {
        try {
            const checkingAccount = await prisma.checkingAccount.update({
                where: {id},
                data: {
                    name,
                    email,
                    number
                }
            });
            return checkingAccount;
        } catch (error) {
            console.error(`Error updating checkingAccount. ${error}`);
            return error;
        }
    }

    async delete(id: string) {
        try {
            const checkingAccount = await prisma.checkingAccount.delete({
                where: {id}
            });
            return checkingAccount;
        } catch (error) {
            console.error(`Error deleting checkingAccount. ${error}`);
            return error;
        }
    }

    async getAll() {
        try {
            const checkingAccounts = await prisma.checkingAccount.findMany();
            return checkingAccounts;
        } catch (error) {
            console.error(`Error finding all checkingAccounts. ${error}`);
            return error;
        }
    }

    async getById(id: string) {
        try {
            const checkingAccount = await prisma.checkingAccount.findUnique({
                where: {id}
            });
            return checkingAccount;
        } catch (error) {
            console.error(`Error finding checkingAccount by id. ${error}`);
            return error;
        }
    }
    
    async findByName(name: string) {
        try {
            const checkingAccount = await prisma.checkingAccount.findMany({
                where: {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    },
                },
                orderBy: {
                    name: 'asc'
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    number: true
                },
            });
            return checkingAccount;
        } catch (error) {
            console.error(`Error finding checkingAccount by name. ${error}`);
            return error;
        }
    }
}

export { CheckingAccountService }