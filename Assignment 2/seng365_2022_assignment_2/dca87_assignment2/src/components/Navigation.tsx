import * as React from 'react';
import Box from '@mui/material/Box';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

export default function Navigation() {

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
                    <Link to={"/*"}>Home</Link>
                </Button>
                <Button variant="contained">
                    <Link to={"/auctions"}>Auctions</Link>
                </Button>
                <Button variant="contained">
                    <Link to={"/users/1"}>My Profile</Link>
                </Button>
                <Button variant="contained">
                    <Link to={"users/login"}>Login</Link>
                </Button>
                <Button variant="contained">
                    <Link to={"users/register"}>Register</Link>
                </Button>
            </Box>
        </React.Fragment>)
}