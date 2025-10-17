import { useEffect, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import {SignIn, CreateAccount} from "../components/LoginComponents";


export default function Login(){
    const [Mode, setMode] = useState(true);
    return(
        <div className="flex flex-col items-center h-full pt-25 gap-6 w-3/4 sm:w-1/2 md:w-1/3 xl:w-1/4 m-auto">
            <div className="flex flex-col items-center h-full gap-2">
                <h2 className="text-2xl"><HiOutlineShoppingBag /></h2>
                <h1>TRACK ORDER</h1>
                <p className="text-xs text-center">Can't wait for your order? Just check order status to find out where it is.</p>
            </div>
            <div className="flex flex-row w-full">
                <button onClick={()=>setMode(true)}
                className={`w-1/2 text-center border-b-2 border-b-${Mode?"black":"stone-200"} p-2 hover:border-b-black`}>
                    Sign In
                </button>
                <button onClick={()=>setMode(false)}
                className={`w-1/2 text-center border-b-2 border-b-${Mode?"stone-200":"black"} p-2 hover:border-b-black`}>
                    Create Account
                </button>
            </div>
            {Mode?<SignIn/>:<CreateAccount/>}
        </div>
    )
}
