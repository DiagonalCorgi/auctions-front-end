import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Alert, AlertTitle, Button, Stack} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import User from "./User";
import user from "./User";
import {useUserStore} from "../Store";

const Register = () => {

    const users = useUserStore(state => state.user)
    const setUser = useUserStore(state => state.setUser)
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

    const [imageEdit, setImageEdit] = React.useState("https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png");
    const updateUserImageState = (event: any) => {
        setImageEdit(event.target.files[0]);
    };

    const setUserNewImage = (userId : any, token: any, image: any) => {
        console.log(userId)
        axios.put('http://localhost:4941/api/v1/users/' + userId + '/image', image,
            {
                headers: {
                    "X-Authorization": token,
                    "Content-Type": image.type
                }
            }
        )
            .then(() => {
                setErrorFlag(false)
                setErrorMessage("")
                navigate('/users/' + userId)
                window.location.reload();
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
                console.log(error.toString());
            })
    }



    const loginUser = () => {
        axios.post('http://localhost:4941/api/v1/users/login', {email: email, password: password},
            {
                headers: {
                    "X-Authorization": users.token
                }
            })
            .then((response) => {
                setUser(response.data)
                console.log(response.data.userId);
                setUserNewImage(response.data.userId, response.data.token, imageEdit)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }


    const registerUser = () => {
            axios.post('http://localhost:4941/api/v1/users/register', {firstName : firstName, lastName : lastName, email: email, password: password},
                {
                    headers: {
                        "X-Authorization": users.token
                    }
                })
                .then((response) => {
                    loginUser()
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
    }

    const show_password_error = () => {
        if(password.length < 6) {
            return (
                <div>
                    <Alert severity="error">Please make sure the password is at least 6 characters long</Alert>
                </div>
            )
        } else {
            return(
                <div>
                    <Button variant="contained" color="error" onClick={() =>  {registerUser()}}
                    >Register</Button>
                </div>
            )
        }
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
                        {show_password_error()}
                    </div>
                    <div>
                        <label>Upload Profile Picture</label>
                    </div>
                    <label htmlFor="raised-button-file">
                        <input
                            accept="image/*"
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={updateUserImageState}
                        />
                    </label>
                </Box></>
        );
}
export default Register;