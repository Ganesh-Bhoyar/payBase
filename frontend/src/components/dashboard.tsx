import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PhoneCall, Search, UserCircle2Icon } from "lucide-react";
import axios from "axios";
import useDebounce from "../customhooks/useDebounce";
import { useNavigate } from "react-router-dom";


interface User {
  name: string,
  phone: string,
  saving_Account: {
    acc_no: string
  }
}
export function Dashboard() {

  const [users, setUsers] = React.useState<User[]>([]);

  const [balance, setBalance] = React.useState<number>(0);
  const [username, setUsername] = React.useState<string>("");

  const [search, setSearch] = React.useState<string>("");

  const searchusers = useDebounce(search, 500);
  const navigate = useNavigate();

  const fetchimmediate = async (value: string) => {
    try {
      const usersResponse = await axios({
        url: "http://localhost:3000/api/v1/user/searchbyname",
        method: "POST",
        data: {
          name: value
        },
        headers: {
          authorization: localStorage.getItem('authorization')
        }
      })
      const usersData = await usersResponse.data;
      setUsers(usersData);
    }
    catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        if (e.response.status === 401 && e.response.data.error === "Invalid token") {
          alert("Invalid session");
        } else if (e.response.status === 400 && e.response.data.error === "User has not account ,sigup first") {
          window.location.href = "/signup";
        } else if (e.response.data && e.response.data.error) {
          alert("Error: " + e.response.data.error);
        } else {
          alert("Search failed (server error)");
        }
      }
    }
  };


  useEffect(() => {
    const fetchbalance = async () => {
      try {
        const balanceResponse = await axios({
          url: "http://localhost:3000/api/v1/account/balance",
          method: "GET",
          headers: {
            authorization: localStorage.getItem('authorization')
          }
        });
        const balanceData = await balanceResponse.data.balance;
        setBalance(balanceData);
        setUsername(balanceResponse.data.name);
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          if (e.response.status === 401 && e.response.data.error === "Invalid token") {
            alert("Invalid session");
          } else if (e.response.status === 400 && e.response.data.error === "User has not account ,sigup first") {
            window.location.href = "/login";
          } else if (e.response.data && e.response.data.error) {
            alert("Error: " + e.response.data.error);
          } else {
            alert("Search failed (server error)");
          }
        }
      }


    }
    fetchbalance();
  }, []);




  useEffect(() => {

    const fetchData = async (value: string) => {
      try {
        const usersResponse = await axios({
          url: "http://localhost:3000/api/v1/user/searchbyname",
          method: "POST",
          data: {
            name: value
          },
          headers: {
            authorization: localStorage.getItem('authorization')
          }
        })
        const usersData = await usersResponse.data;
        setUsers(usersData);
      }
      catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          if (e.response.status === 401 && e.response.data.error === "Invalid token") {
            alert("Invalid session");
          } else if (e.response.status === 400 && e.response.data.error === "User has not account ,sigup first") {
            window.location.href = "/signup";
          } else if (e.response.data && e.response.data.error) {
            alert("Error: " + e.response.data.error);
          } else {
            alert("Search failed (server error)");
          }
        }
      }

    };

    fetchData(searchusers);

  }, [searchusers]);


  return (
    <div className="flex flex-col items-center justify-start mt-9  w-full h-full min-h-screen bg-gray-100">
      <div className="flex items-center justify-between w-full h-9   p-8 shadow-lg px-12 fixed top-0 bg-white">
        <div className="text-2xl font-bold">payBase</div>
        <div>Hello, {username}</div>
      </div>
      <div className="flex flex-col justify-start align-start mr-32">
        <div className="text-xl font-serif font-bold w-full h-7 mt-16 ml-12 ">Your Balance {balance}</div>
        <div className="flex flex-col items-start w-full ml-12 justify-start mt-[45px] space-y-4">
          <div className="text-xl font-sans font-bold mb-3">Users</div>
          <div className="w-full max-w-xl flex items-center space-x-2">
            <div className="flex items-center border-2 border-gray-400  bg-white rounded-lg w-full pl-4">
              <Search></Search>
              <input type="text" placeholder="Search for users..." value={search} onChange={(e) => { setSearch(e.target.value) }} className="w-full p-2 border-2 border-white focus:border-white outline-none rounded-lg  " />
            </div>
            <Button onClick={() => { fetchimmediate(search) }}>Search</Button>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4 w-screen max-w-[1200px] overflow-x-hidden ">
            {users == undefined || users.length == 0 ? (
              <div className="text-center text-gray-500 flex  justify-center align-center ">No users found</div>
            ) : (
              users.map((element) => {
                return (
                  <div key={element.saving_Account.acc_no} className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center w-full">
                    <div className="text-xl font-mono font-bold flex justify-center align-center">
                      <UserCircle2Icon className="pr-1"></UserCircle2Icon>
                      {element.name}
                    </div>
                    <div className="text-md font-mono flex justify-center align-center">
                      <PhoneCall className="pr-2"></PhoneCall>
                      {element.phone}
                    </div>
                    <div className="text-sm font-mono">
                      <Button onClick={() => {
                        //  alert(`You are about to pay ${element.name} with account number ${element.saving_Account.acc_no}`);
                        navigate("/transfer", { state: { recivername: element.name, reciveraccount: element.saving_Account.acc_no } })
                      }}>Pay</Button>
                    </div>
                  </div>
                );
              })
            )}
            {/* <div className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center w-full">
                    <div className="text-xl font-mono font-bold flex justify-center align-center"><UserCircle2Icon  className="pr-1"></UserCircle2Icon>{element.name}</div>
                    <div className="text-md font-mono flex justify-center align-center"><PhoneCall className="pr-2"></PhoneCall>  {element.phone}</div>
                    <div className="text-sm font-mono"><Button>Pay</Button></div>
                </div>
                })})
                 */}



          </div>
        </div>
      </div>
    </div>
  )

}