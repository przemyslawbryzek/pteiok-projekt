import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { AuthContext } from "../context/AuthContext";

export function SignIn()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const handleLogin = async () => {
    try {
      const res = await api.post("/login", {
        email,
        password,
      });
      login(res.data.access_token);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Błąd logowania");
    }
  };

    return(
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col-reverse">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer border-b-1 border-b-stone-200 
                    hover:border-b-black focus:outline-none focus:ring-0 
                    focus:border-b-black invalid:!border-b-red-400"
                />
                <label className="flex flex-col peer-focus:text-xs 
                transition-all peer-focus:pb-2 peer-invalid:text-red-400">
                    Email*
                </label>
            </div>
            <div className="flex flex-col-reverse">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer border-b-1 border-b-stone-200 
                    hover:border-b-black focus:outline-none focus:ring-0 
                    focus:border-b-black invalid:!border-b-red-400"
                />
                <label className="flex flex-col peer-focus:text-xs 
                transition-all peer-focus:pb-2 peer-invalid:text-red-400">
                    Password*
                </label>
            </div>
            <button onClick={handleLogin}
            className="bg-black text-white p-2 hover:bg-white hover:text-black border-1 border-black duration-300">
                Sign In
            </button>
    </div>
    )
}
export function CreateAccount()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleRegister = async () => {
    try {
      const res = await api.post("/register", {
        email,
        password,
      });
      login(res.data.access_token);
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

    return(
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col-reverse">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer border-b-1 border-b-stone-200 
                    hover:border-b-black focus:outline-none focus:ring-0 
                    focus:border-b-black invalid:!border-b-red-400"
                />
                <label className="flex flex-col peer-focus:text-xs 
                transition-all peer-focus:pb-2 peer-invalid:text-red-400">
                    Email*
                </label>
            </div>
            <div className="flex flex-col-reverse">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer border-b-1 border-b-stone-200 
                    hover:border-b-black focus:outline-none focus:ring-0 
                    focus:border-b-black invalid:!border-b-red-400"
                />
                <label className="flex flex-col peer-focus:text-xs 
                transition-all peer-focus:pb-2 peer-invalid:text-red-400">
                    Password*
                </label>
            </div>
            <button onClick={handleRegister}
            className="bg-black text-white p-2 hover:bg-white hover:text-black border-1 border-black duration-300">
                Create Account
            </button>
        </div>
    )
}