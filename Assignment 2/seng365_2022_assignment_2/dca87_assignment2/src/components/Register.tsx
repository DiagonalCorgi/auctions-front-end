import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Alert, AlertTitle, Button, Stack} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import User from "./User";

const Register = () => {
    const navigate = useNavigate();
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const updateFirstNameState = (event : any) => {
        setFirstName(event.target.value);
    };

    const updateLastNameState = (event : any) => {
        setLastName(event.target.value);
    };

    const updateEmailState = (event : any) => {
        setEmail(event.target.value);
    };
    const updatePasswordState = (event : any) => {
        setPassword(event.target.value);
    };


    const registerUser = () => {
        axios.post('http://localhost:4941/api/v1/users/register', {firstName : firstName, lastName : lastName, email: email, password: password})
            .then((response) => {
                navigate('/users/login');
                console.log(response);
                console.log(response.data);
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    if(errorFlag) {
        return (
            <div>
                <h1>Register</h1>
                <Alert severity="error">Please try enter all details</Alert>
                <Alert severity="error">{errorMessage}</Alert>
                <Button variant="contained" onClick={() => {window.location.href="/users/register"}}>
                    Try Again
                </Button>
            </div>


        )
    } else
        return (
            <><h1>Register</h1>
                <Box
                    component="form"
                    padding="10"
                    noValidate
                    autoComplete="off">
                    <div>
                        <TextField id="firstName" label="First Name" color="error"  onChange={updateFirstNameState} value={firstName} focused/>
                    </div>
                    <div>
                        <TextField id="lastName" label="Last Name" color="error"  onChange={updateLastNameState} value={lastName} focused/>
                    </div>
                    <div>
                        <TextField id="email" label="email" color="error" onChange={updateEmailState} value={email} focused/>
                    </div>
                    <div>
                        <TextField id="password" label="password" color="error" type="password" onChange={updatePasswordState} value={password} focused/>
                    </div>
                    <div>
                        <Button variant="contained" color="error" onClick={() =>  {registerUser()}}
                        >Register</Button>
                    </div>
                </Box></>
        );
}
export default Register;