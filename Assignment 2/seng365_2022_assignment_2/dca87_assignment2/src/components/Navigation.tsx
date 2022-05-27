import * as React from 'react';
import Box from '@mui/material/Box';
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {useUserStore} from "../Store";
import SellIcon from '@mui/icons-material/Sell';
import axios from "axios";

export default function Navigation() {
    const users = useUserStore(state => state.user)
    const userLogout = useUserStore(state => state.removeUser)
    const navigate = useNavigate();
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("")

    const logoutUser = () => {
        axios.post('http://localhost:4941/api/v1/users/logout')
            .then((response) => {
                console.log(userLogout)
                userLogout(users)
                navigate('/auctions');
            }, (error) => {
                navigate('/auctions');
                console.log(userLogout(users))
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const logout = () => {
        if (users.token != "") {
            return (
                <div>
                    <Button variant="contained">
                        <Link to={"/users/" + users.userId}>My Profile</Link>
                    </Button>
                    <Button variant="contained" onClick={() =>
                    {logoutUser()}}
                    >Logout</Button>
                </div>
            )
        }
    }

    const login = () => {
        if (users.token == "") {
            return (
                <div>
                    <Button variant="contained">
                        <Link to={"users/login"}>Login</Link>
                    </Button>
                    <Button variant="contained">
                        <Link to={"users/register"}>Register</Link>
                    </Button>
                </div>
            )
        }
    }
    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 1,
                    m: 1,
                    backgroundColor: "#282c34",
                    borderRadius: 1,
                }}>
                    <Button variant="contained">
                        <Link to={"/auctions"}>
                            <SellIcon />
                            Auctions</Link>
                    </Button>
                {login()}
                {logout()}
            </Box>
        </React.Fragment>)
}