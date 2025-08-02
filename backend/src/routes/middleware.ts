import express,{Request,Response,NextFunction} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';
import { PrismaClient } from '../../generated/prisma';
const prisma = new PrismaClient();


export const authMiddleware =async (req: Request, res: Response, next: NextFunction) => {
    const token=req.headers.authorization;
    if(!token)
    {
        res.status(401).json({error:"User is not logged in"});
    }
    else
    {
        try{
            const decoded=jwt.verify(token,config.JWT_SECRET) as JwtPayload;
            const user= await prisma.user.findUnique({
                where:{
                    email:decoded.email
                }
            });
            if(!user)
            {
                res.status(401).json({error:"User has not account ,sigup first"});
            }
            else
            {
                (req as any).user=user;
                next();
            }
           
        }
        catch(error)
        {
            res.status(401).json({error:"Invalid token"});
        }
    }
};