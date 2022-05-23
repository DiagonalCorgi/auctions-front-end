import React from "react";
import axios from "axios"
import {Link, useNavigate, useParams} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import EditIcon from "@mui/icons-material/Edit";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";


const User = () => {
    const {id} = useParams();
    const [user, setUser] = React.useState<User>({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        token: "",
        image_filename: ""
    })
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [dialogUser, setDialogUser] = React.useState<User>({
        token: "",
        email: "",
        firstName: "",
        image_filename: "",
        lastName: "",
        password: "",
        id: 0
    })
    const [openEditDialog, setOpenEditDialog] = React.useState(false)

    const [firstNameEdit, setFirstNameEdit] = React.useState("");
    const [lastNameEdit, setLastNameEdit] = React.useState("");
    const navigate = useNavigate();
    const updateFirstNameEditState = (event: any) => {
        setFirstNameEdit(event.target.value);
    };
    const updateLastNameEditState = (event: any) => {
        setLastNameEdit(event.target.value);
    };

    const handleEditDialogOpen = (user: User) => {
        setDialogUser(user)
        setOpenEditDialog(true);
    };
    const handleEditDialogClose = () => {
        setDialogUser({
            token: "",
            email: "",
            firstName: "",
            image_filename: "",
            lastName: "",
            password: "",
            id: -1
        })
        setOpenEditDialog(false);
    };


    const editUser = () => {
        axios.patch('http://localhost:4941/api/v1/users/' + id, {firstName : firstNameEdit, lastName: lastNameEdit})
            .then((response) => {
                navigate('/users/' + response.data.userId)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const getUser = () => {
        axios.get('http://localhost:4941/api/v1/users/' + id)
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setUser(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    React.useEffect(() => {
        getUser()
    }, [id])
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
                    <h2>Email: {user.email}</h2>
                </div>
                <div>
                    <h2>Image: {user.image_filename}</h2>
                </div>
                <div><Button variant="contained" endIcon={<EditIcon/>} onClick={() => {
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
                                Are you sure you want to edit this user?
                            </DialogContentText>
                            <TextField id="firstName" label="First Name" variant="outlined"
                                       value={firstNameEdit} onChange={updateFirstNameEditState}/>
                            <TextField id="lastName" label="Last Name" variant="outlined"
                                       value={lastNameEdit} onChange={updateLastNameEditState}/>
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
            </div>
        )
    }
}







export default User;
