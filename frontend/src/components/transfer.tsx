
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { z} from "zod";
 import { Button } from "@/components/ui/button"
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

const formSchema = z.object({
  amount: z.coerce.number().min(1, "Amount must be greater than 0").max(100000, "Amount must be less than or equal to 100000"),
});

 
export function Transfer() {
   type FormValues = z.infer<typeof formSchema >;
   const location = useLocation();
   const nagivate=useNavigate();

   const { recivername, reciveraccount } = location.state || {};
   console.log(recivername,reciveraccount);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
    
   
    
    
    
  },
  mode: 'onChange',
  })

     async function onSubmit(values: z.infer<typeof formSchema>) {
          alert(JSON.stringify({
        reciveraccount: reciveraccount,
        amount: values.amount,
        recivername: recivername
      }, null, 2));
     nagivate("/paymentprocessing",{state:{ reciveraccount:reciveraccount,amount:values.amount,recivername:recivername}});
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount(in Rs)</FormLabel>
              <FormControl>
                <Input placeholder="Enter amount" {...field} />
              </FormControl>
              {/* <FormDescription>Your contact email address.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

       
 

        <Button type="submit" className="w-full bg-emerald-400">Initiate Transfer</Button>
      </form>
      
    </Form>
      </div>
      </div>

  );
}

  

 
