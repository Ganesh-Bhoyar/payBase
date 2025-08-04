import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Signin} from "@/components/login";
import { Signup } from "@/components/signnp";
import { Dashboard } from "@/components/dashboard";
import { Transfer } from "@/components/transfer";
import { Landing } from "@/components/landing";
import {Paymentpro} from"@/components/paymentprocessing";
import {SettingPaymentPassword} from "@/components/settingpaymentpassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
function App() {

  return (
     <>
     <BrowserRouter>

       <Routes>
        <Route path="/" element={<Landing />} />
         <Route path="/login" element={<Signin />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/transfer" element={<Transfer />} />
         <Route path="/paymentprocessing" element={<Paymentpro></Paymentpro>}></Route>
         <Route path='/settingpaymentpassword' element={<SettingPaymentPassword />}></Route>
       </Routes>
     </BrowserRouter>
       <ToastContainer />

       </>

  )
}

export default App
