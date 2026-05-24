// Setting.jsx

import { useNavigate } from "react-router-dom";
import "../style/Setting.css";
import { toast } from "react-toastify";
// import Loader from "./Loader";
// import { useState } from "react";
function Setting() {

    const navigate = useNavigate();
    // const [loading,setLoading]=useState(false)
const token=localStorage.getItem("item")
    function logout() {

        localStorage.removeItem("token");

        toast.success("Logout Successful");

        navigate("/");
        window.location.reload();
    }

    return (

        <div className="setting-container">

            <div className="setting-card">

                <h1>Settings</h1>

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Setting;