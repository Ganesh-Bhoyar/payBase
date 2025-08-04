
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { z} from "zod";
 import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Crossicon from "./icons/crossicon";

export const formSchema=z.object({
    
    password:z.string().min(6,"Password must be at least 6 characters long"),
    paymentpassword:z.string().min(6,"Payment password must be at least 6 characters long"),
    confirmpaymentpassword:z.string().min(6,"Confirm payment password must be at least 6 characters long")
}).refine(
  (data) => data.paymentpassword === data.confirmpaymentpassword,
  { message: "Passwords do not match", path: ["confirmpaymentpassword"] });

export function SettingPaymentPassword() {
   
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  mode: 'onChange',
  })
   return (
      <div className="w-full h-screen flex items-center justify-center bg-[#7a7a7a] ">
       
      <div className="w-96 max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
    
    <Form {...form}  >
        {/* <div className="text-black font-bold flex justify-end outline-none focus:border-2 focus:border-blue-500  cursor-pointer border-gray-400 w-[20px] h-12"><Crossicon></Crossicon></div> */}
        <div className="text-center text-3xl font-bold flex col    align-items justify-center"><span className="ml-[97px]">Sign In</span><span className="ml-[85px]  cursor-pointer hover:border-2 hover:border-slate-500 hover:rounded-lg"> <Crossicon></Crossicon></span></div>
        <div className="text-center px-6">Enter your  crendentials to log in your account </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
         

        

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Login Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              {/* <FormDescription>Must be at least 6 characters long.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Set your Payment password" {...field} />
              </FormControl>
               <FormDescription>Your payment password will be required whenever you authorize a payment. For your security, choose a unique and strong password.</FormDescription> 
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmpaymentpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Payment password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              {/* <FormDescription>Must be at least 6 characters long.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
 

        <Button type="submit" className="w-full">Submit</Button>
      </form>
      
    </Form>
      </div>
      </div>

  );
}

  
   async function onSubmit(values: z.infer<typeof formSchema>) {
    try
   { const res=await axios({
      url:"http://localhost:3000/api/v1/user/changepaymentpassword",
      method:"POST",
      data: {
        password:values.password,
        paymentpassword:values.paymentpassword
      },
      headers:{
        authorization:localStorage.getItem("authorization")
      }

    })
   if (res.status === 200) {
     alert(res.data.message);
    
     window.location.href="/dashboard";
   }
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      if (err.response.status === 400) {
        alert("Invalid credentials");
      } else if (err.response.data && err.response.data.error) {
        alert("Error: " + err.response.data.error);
      } else {
        alert("Login failed (server error)");
      }
    } else {
      alert("Login failed (network or unknown error)");
    }
  }
}
