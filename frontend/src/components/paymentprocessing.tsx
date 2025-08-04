
import { zodResolver } from "@hookform/resolvers/zod"
import React ,{useState}from "react";
import { useForm } from "react-hook-form"
import axios from "axios"
import { z} from "zod";
 import { Button } from "@/components/ui/button"
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import { useLocation,useNavigate } from "react-router-dom";
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
import { User2Icon, UserCircle2Icon } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})
 
export function Paymentpro() {
   type FormValues = z.infer<typeof formSchema >;
   const location = useLocation();
   const nagivate=useNavigate();
   const [loading,setLoading]=useState(false);
   const message=React.useRef<string>();

   const { recivername, reciveraccount,amount } = location.state || {};
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  mode: 'onChange',
  })
  async function  onSubmit(data: z.infer<typeof formSchema>) {
   
    try{ 
      const res= await axios({
      url:"http://localhost:3000/api/v1/account/transfer",
      method:"POST",
      data:{
        acc_no:reciveraccount,
        amount:parseInt(amount),
        paymentpassword:data.pin,
      },
      headers:{
        authorization:localStorage.getItem("authorization"),
      }
    });
   
      message.current=(res as any).data.message;
      console.log(message.current);
      alert("success");
      console.log(res.data);
      setLoading(false);
      //  toast(
    // <div>
    //   <div>Your Transition is Successful</div>
    //   <pre className="mt-2 w-[290px] rounded-md bg-neutral-950 p-4 overflow-auto">
    //     <code className="text-white">{JSON.stringify(`Succefully Transfered ${amount} to ${reciveraccount}`, null, 2)}</code>
    //   </pre>
    // </div>,
    // {
    //   // any valid toast options here (e.g., position)
    //   position: "top-center",
    //   autoClose: 5000,
    // }
  // );
      nagivate("/dashboard");
   
  }
    catch(error)
    {   
    //   if (axios.isAxiosError(err) && err.response) {
    //   if (err.response.status == 400) {
    //     alert((err as any).data.error);
    //   } else if (err.response.data && err.response.data.error) {
    //     alert("Error: " + err.response.data.error);
    //   } else {
    //     alert("Signup failed (server error)");
    //   }
    // } else {

    //   alert(`Signup failed (network or unknown error ${err})`);
    // }
      console.error("Unexpected error:", error);
    }
  // toast(
  //   <div>
  //     <div>`You status </div>
  //     <pre className="mt-2 w-[290px] rounded-md bg-neutral-950 p-4 overflow-auto">
  //       <code className="text-white">{JSON.stringify(message.current, null, 2)}</code>
  //     </pre>
  //   </div>,
  //   {
  //     // any valid toast options here (e.g., position)
  //     position: "top-center",
  //     autoClose: 5000,
  //   }
  // );

  // navigate("/paymetprocessing",{state:{ reciveraccount:reciveraccount, amount}});
}

   return (
      <div className="w-full h-screen flex items-center justify-center bg-[#7a7a7a] ">
       
      <div className="w-102 max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
    
    <Form {...form}  >
        {/* <div className="text-black font-bold flex justify-end outline-none focus:border-2 focus:border-blue-500  cursor-pointer border-gray-400 w-[20px] h-12"><Crossicon></Crossicon></div> */}
        <div className="text-center text-3xl font-bold flex col    align-items justify-center"><span className="ml-[97px]"> Send Money</span><span className="ml-[85px]  cursor-pointer hover:border-2 hover:border-slate-500 hover:rounded-lg"> <Crossicon></Crossicon></span></div>
        <div className=" flex justify:start align-center gap-2 text-lg "><UserCircle2Icon className="size-8"></UserCircle2Icon> {recivername} </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
         

        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
           <FormItem>
              <FormLabel> Payment Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please Enter the Payment Password to complete payment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
 

        <Button type="submit" className="w-full bg-emerald-400">Pay Now</Button>
      </form>
      
    </Form>
      </div>
      </div>

  );
}

  

 