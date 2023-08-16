import React, {useState} from "react";
import {Button} from "@mui/material";
import Login from "./Login";

//TODO: create Logout button
function Logout() {


    const logout = () => {
        sessionStorage.removeItem("jwt");

    }

    return (
        <div>
            <Button>Logout</Button>
        </div>
    )
}

export default Logout;