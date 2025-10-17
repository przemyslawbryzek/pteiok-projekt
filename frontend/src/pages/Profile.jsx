import { useEffect, useState, useContext} from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Profile(){
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        api.get(`/profile`).then((res) => setUser(res.data));
    }, []);
    return(
        <div className="flex flex-col">
            {user.user_id}
            <button onClick={() => {
                logout();
                navigate("/");
            }}
            className=""
            >
                Log Out
            </button>
        </div>
    )
}