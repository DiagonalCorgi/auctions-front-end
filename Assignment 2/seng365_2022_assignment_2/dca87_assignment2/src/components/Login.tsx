import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Alert, Button} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [errorFlag, setErrorFlag] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("")
    const [email, setEmail] = React.useState("");
    const [authToken, setAuthToken] = React.useState("");
    const [password, setPassword] = React.useState("");

    const updateEmailState = (event : any) => {
        setEmail(event.target.value);
    };
    const updatePasswordState = (event : any) => {
        setPassword(event.target.value);
    };

    const loginUser = () => {
        axios.post('http://localhost:4941/api/v1/users/login', {email: email, password: password})
            .then((response) => {
                navigate('/users/' + response.data.userId);
                console.log(response.data.token);
                setAuthToken(response.data.token);
            }, (error) => {
            setErrorFlag(true)
            setErrorMessage(error.toString())
        })
    }

    if(errorFlag) {
        return (
            <div>
                <h1>Login</h1>
                <Alert severity="error">Incorrect Email or Password. Please try again</Alert>
                <Alert severity="error">{errorMessage}</Alert>
                <Button variant="contained" onClick={() => {window.location.href="/users/login"}}>
                    Try Again
                </Button>
            </div>
        )
    } else
    return (
        <><h1>Login</h1>
            <Box>
                <div>
                    <TextField id="email" label="email" color="primary" onChange={updateEmailState} value={email} focused/>
                </div>
                <div>
                    <TextField id="password" label="password" color="primary" type="password" onChange={updatePasswordState} value={password} focused/>
                </div>
                <div>
                    <Button variant="contained" onClick={() =>
                    {loginUser()}}
                    >Login</Button>
                </div>

        </Box></>
    );
}
export default Login;