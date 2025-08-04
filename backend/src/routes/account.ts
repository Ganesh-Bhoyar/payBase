import express, { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';
const prisma = new PrismaClient();
import { authMiddleware } from './middleware';
const bcrypt = require('bcrypt');

const accountRouter = express.Router();



accountRouter.get("/balance", authMiddleware, async (req: Request, res: Response) => {
    const user_id = (req as any).user.id;
    console.log("User ID:", user_id);
    const balance = await prisma.saving_Account.findUnique({
        where: {
            user_id: user_id
        },
        select: {
            balance: true
        }
    })
    if (balance) {
        res.status(200).json({ balance: balance.balance, name: (req as any).user.name });
    }
    else {
        res.status(400).json({ error: "No balance found" });
    }
});


accountRouter.post("/transfer", authMiddleware, async (req: Request, res: Response) => {
    const user_id = (req as any).user.id;
    const { amount, acc_no, paymentpassword } = req.body;
    if (parseInt(amount) <= 0) {
        res.status(400).json({ error: "Invalid amount" });
    }

    try {
        const recipient = await prisma.saving_Account.findUnique({
            where: {
                acc_no: acc_no
            },

        })
    }
    catch (error) {
        return res.status(400).json({ error: "Invalid Account number" });
    }


    const sender = await prisma.saving_Account.findUnique({
        where: {
            user_id: user_id
        },
        select: {
            balance: true,
            acc_no: true,

        }
    })
    console.log("Sender:", sender);
    console.log("one condition passed of invalid account number");
    if (!sender) {
        return res.status(400).json({ message: "Something went wrong" });
    }
    else if ((sender?.balance) < parseInt(amount)) {
        console.log("Insufficient balance");
        return res.status(400).json({ error: "Insufficient balance", balance: sender.balance, amount: amount });
    }
    console.log("two condition passed of insufficient balance");
    console.log(paymentpassword, (req as any).user.paymentpassword);
    const passwordMatch = await bcrypt.compare(paymentpassword, (req as any).user.paymentpassword);
    if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid payment password" });
    }

    try {
        const result = await prisma.$transaction([
            prisma.saving_Account.update({
                where: {
                    acc_no: sender.acc_no
                },
                data: {
                    balance: {
                        decrement: amount
                    }
                }
            }),

            prisma.saving_Account.update({
                where: {
                    acc_no: acc_no
                },
                data: {
                    balance: {
                        increment: amount
                    }
                }
            })
        ]);
        console.log("Transaction result:", result);
        return res.status(200).json({ message: "Transfer successful" });
    }
    catch (error) {
        console.error("Transaction error:", error);
        return res.status(400).json({ error: "Transfer failed" });
    }


});



accountRouter.get('/:user_id', authMiddleware, async (req: Request, res: Response) => {
    const user_id = req.params.user_id;
    if (user_id !== (req as any).user.id) {
        return res.status(403).json({ error: "Unauthorized access" });
    }

    const result = await prisma.saving_Account.findUnique({
        where: {
            user_id: user_id
        },
        select: {
            acc_no: true,
            loan_acc_no: true,
            acc_type: true,
            balance: true,
            mod_balance: true,
            interest: true,
            user: {
                select: {
                    name: true,
                    phone: true
                }
            }
        }
    });
    res.status(400).json(result);
});

export default accountRouter;