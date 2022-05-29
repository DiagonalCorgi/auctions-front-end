import React from "react";
import axios from "axios"
import {Link, useNavigate, useParams, useSearchParams} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import EditIcon from "@mui/icons-material/Edit";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useUserStore} from "../Store";



const User = () => {

    const users = useUserStore(state => state.user)
    const params = useParams();

    const [user, setUser] = React.useState<User>({
        firstName: "",
        lastName: "",
        email: ""
    })

    const [firstName, setFirstName] = React.useState("")

    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [dialogUser, setDialogUser] = React.useState<User>({
        email: "",
        firstName: "",
        lastName: "",
    })
    const [openEditDialog, setOpenEditDialog] = React.useState(false);


    const navigate = useNavigate();

    const [firstNameEdit, setFirstNameEdit] = React.useState("");
    const updateFirstNameEditState = (event: any) => {
        setFirstNameEdit(event.target.value);
    };

    const [lastNameEdit, setLastNameEdit] = React.useState("");
    const updateLastNameEditState = (event: any) => {
        setLastNameEdit(event.target.value);
    };

    const [emailEdit, setEmailEdit] = React.useState("");
    const updateEmailState = (event: any) => {
        setEmailEdit(event.target.value);
    };

    const [passwordEdit, setPasswordEdit] = React.useState("");
    const updatePasswordEditState = (event: any) => {
        setPasswordEdit(event.target.value);
    };

    const [currentPasswordEdit, setCurrentPasswordEdit] = React.useState("");
    const updateCurrentPasswordEditState = (event: any) => {
        setCurrentPasswordEdit(event.target.value);
    };

    const [imageEdit, setImageEdit] = React.useState("");
    const updateUserImageState = (event: any) => {
        setImageEdit(event.target.files[0]);
    };

    const handleEditDialogOpen = (user: User) => {
        setDialogUser(user)
        setOpenEditDialog(true);
    };
    const handleEditDialogClose = () => {
        setDialogUser({
            email: "",
            firstName: "",
            lastName: "",
        })
        setOpenEditDialog(false);
    };

    const show_editable = () => {
        if (users.userId.toString() == params.id) {
            return (
                <div>
                    <div>
                        <div>
                            <h2>Email: {user.email}</h2>
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
                        {show_upload()}
                    </div>
                    <Button variant="contained" endIcon={<EditIcon/>} onClick={() => {
                        handleEditDialogOpen(user)
                    }}>
                        Edit
                    </Button>
                    <Dialog
                        open={openEditDialog}
                        onClose={handleEditDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            {"Edit User?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Please fill all details
                            </DialogContentText>
                            <div>
                                <TextField id="firstName" label="First Name" variant="outlined"
                                           value={firstNameEdit} onChange={updateFirstNameEditState}/>
                            </div>
                            <div>
                                <TextField id="lastName" label="Last Name" variant="outlined"
                                           value={lastNameEdit} onChange={updateLastNameEditState}/>
                            </div>
                            <div>
                                <TextField id="email" label="Email" variant="outlined"
                                           value={emailEdit} onChange={updateEmailState}/>
                            </div>
                            <div>
                                <TextField id="password" label="Enter new Password" variant="outlined" type="Password"
                                           value={passwordEdit} onChange={updatePasswordEditState}/>
                            </div>
                            <div>
                                <TextField id="currentPassword" label="Enter Current Password" variant="outlined" type="Password"
                                           value={currentPasswordEdit} onChange={updateCurrentPasswordEditState}/>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleEditDialogClose}>Cancel</Button>
                            <Button variant="outlined" color="error" onClick={() => {
                                editUser()
                            }} autoFocus>
                                Edit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
        }
    }

    const editUser = () => {
        axios.patch('http://localhost:4941/api/v1/users/' + users.userId, {
            firstName: firstNameEdit,
            lastName: lastNameEdit,
            email: emailEdit,
            password: passwordEdit,
            currentPassword: currentPasswordEdit
        }, {
            headers: {
                "X-Authorization": users.token
            }
        })
            .then((response) => {
                setOpenEditDialog(false);
                navigate('/users/' + users.userId)
                getUser();
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }


    const getUser = () => {
        axios.get('http://localhost:4941/api/v1/users/' + params.id, {
            headers: {
                "X-Authorization": users.token
            }
        })
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setUser(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }



    const editUserNewImage = (image: any) => {
        axios.put('http://localhost:4941/api/v1/users/' + users.userId + '/image', image,
            {
                headers: {
                    "X-Authorization": users.token,
                    "Content-Type": image.type
                }
            }
        )
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                navigate('/users/' + users.userId)
                window.location.reload();
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
                console.log(error.toString());
            })
    }

    React.useEffect(() => {
        getUser()
    }, [])

    const show_upload = () => {
        if (imageEdit !== "") {
            return (
                <Button variant="outlined" onClick={() => {
                    editUserNewImage(imageEdit)
                }} autoFocus>
                    Change Image
                </Button>
            )
        }
    }

    if (errorFlag) {
        return (
            <div>
                <h1>User</h1>
                <div style={{color: "red"}}>
                    {errorMessage}
                </div>
                <Button variant="contained">
                    <Link to={"/auctions"}>Back to Auctions</Link>
                </Button>
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    <h1>{user.firstName} {user.lastName}</h1>
                </div>
                <div>
                    <img src={'http://localhost:4941/api/v1/users/' + params.id + '/image'} alt="" onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
                    }} width="200px" height="200px"/>
                </div>
                {show_editable()}
            </div>
        )
    }
}








export default User;
