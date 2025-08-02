 import express ,{Request,Response} from 'express';
 const zod = require('zod');
 import { longinschema, signinschema, updateuserschema } from '../schemas/zod-schema/schema';
 import { PrismaClient } from '../../generated/prisma';
 const prisma = new PrismaClient();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
import { config } from '../config';
import { authMiddleware } from './middleware';

 

const apiRouter=express.Router();


apiRouter.post('/signup', async (req: Request, res: Response) => {
 
    console.log("i am inside singup route")
    const validation = longinschema.safeParse(req.body);
   
    if (!validation.success) {
        console.log("validation failed");
        return res.status(411).json({ errors: validation.error.errors });
    }
    else
    {
        try{
            validation.data.password= await bcrypt.hash(validation.data.password, 5);
           
            const user=await prisma.user.create({
                data: validation.data});
           
            console.log("User created successfully:", user);
            
            if(user)
            {  const acc=await prisma.saving_Account.create({
                data:{
                    user_id:user.id,
                    acc_type:"Saving",
                    balance:Math.random() * 1000,
                    mod_balance:0,
                    interest:0,
                    
                }
            });
                console.log("Saving account created successfully:", acc);
                res.status(200).json({ message: "Login successful && Saving account created" ,acc_no:acc.acc_no});
            }
        }
      catch (error) {
        console.log(error);
   
   
    
    if ((error as any).code === "P2002" &&( error as any).target?.includes("email")) {
        console.log("User already exists with this email");
      return res.status(409).json({ error: "User already exists with this email" });
    }
    if ((error as any).code === "P2002" &&( error as any).target?.includes("phone")) {
        console.log("User already exists with this email");
      return res.status(409).json({ error: "User already exists with this Phone no" });
    }
  
 
  console.error(error);
  return res.status(500).json({ error: "Internal server error" });
}

    }
});

apiRouter.post('/signin',async (req:Request,res:Response)=>{
   
    const validation =signinschema.safeParse(req.body);
    if(!validation.success)
    {
        res.status(411).json({errors:validation.error.errors});
    }
    else
    {
        const user =await prisma.user.findUnique({
            where:{
                email: validation.data.email
            }
        });
        if(!user)
        {
            res.status(400).json({error:"Invalid credentials"});
        }
        else
        {  const passwordMatch=await bcrypt.compare(validation.data.password,user.password);
            if(!passwordMatch)
            {
                res.status(400).json({error:"Invalid credentials"});
            }
            else
            {
                 const token= jwt.sign({email:user.email},config.JWT_SECRET);
                 res.status(200).json({token:token,message:"Successfully signed in"});
            }
          
        }
    }
});

apiRouter.post('/update',authMiddleware, async (req: Request, res: Response) => {
    const validation =updateuserschema.safeParse(req.body);
    if(!validation.success)
    {
        res.status(411).json({errors:validation.error.errors});
    }
   else
   {
        const user = await prisma.user.update({
            where: {
                email: (req as any).user.email
            },
            data: {
                name: validation.data.name,
                password: await bcrypt.hash(validation.data.password, 5),
                paymentpassword: await bcrypt.hash(validation.data.paymentpassword, 5)
            }
        });
        if(user)
        {
            res.status(200).json({ message: "User updated successfully" });
        }
        else
        {
            res.status(400).json({ error: "Failed to update user" });
        }
   }
});

apiRouter.post('/searchbyname',authMiddleware,async (req: Request, res: Response) => {
    const name =req.body.name;
    const result = await prisma.user.findMany({
        where: {
            name: {
                contains: name
            },
           
        },
         select:{
                name: true,
                phone: true
            }
    });
    if(result)
    {
        res.status(200).json(result);
    }
    else
    {
        res.status(200).json({ error: "No users found with that name" });
    }
});

apiRouter.post('/changepaymentpassword',authMiddleware,async (req: Request, res: Response) => {
    const user_id =(req as any).user.id;
    const { password,paymentpassword}=req.body;

    try
   { const user = await prisma.user.findUnique({
        where: {
            id: user_id
        },
        select: {
            password: true,
            paymentpassword: true
        }
    });
    if(user)
    {   const passwordMatch=await bcrypt.compare(  password,user.password);
        if(passwordMatch)
        {
           
           
                
                const newpaymentpassword=await bcrypt.hash(paymentpassword,5);
                await prisma.user.update({
                    where: {
                        id: user_id
                    },
                    data: {
                       
                        paymentpassword:newpaymentpassword
                    }
                });
                res.status(200).json({ message: "Password changed successfully" });
             
            
        }
        else
        {
            res.status(400).json({ error: "Incorrect password" });
        }
    }
    else
    {
        res.status(400).json({ error: "Something went wrong" });
    }
}
catch(error){
     res.status(400).json({error:"Server Error"});
}
});


export default apiRouter;
