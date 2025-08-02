const zod=require('zod');


export const longinschema=zod.object({
    name:zod.string().min(1,"Name is required"),
    email:zod.string().email("Invalid email format"),
    password:zod.string().min(6,"Password must be at least 6 characters long"),
    phone:zod.string().min(10,"Phone number must be at least 10 digits").max(15,"Phone number cannot exceed 15 digits") 
})

export const signinschema=zod.object({
      email:zod.string().email("Invalid email format"),
    password:zod.string().min(6,"Password must be at least 6 characters long")
});


export const updateuserschema=zod.object({
    name:zod.string().min(1,"Name is required"),
    password:zod.string().min(6,"Password must be at least 6 characters long"),
    paymentpassword:zod.string().min(6,"Payment password must be at least 6 characters long"),
})