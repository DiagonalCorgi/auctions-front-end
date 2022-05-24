import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Alert, Button} from "@mui/material";
import * as React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "../Store";


const AuctionCreate = () => {

    const users = useUserStore(state => state.user)

    const navigate = useNavigate();

    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [categoryId, setCategoryId] = React.useState(0);
    const [endDate, setEndDate] = React.useState("");
    const [reserve, setReserve] = React.useState(0);

    const updateTitleState = (event : any) => {
        setTitle(event.target.value);
    };

    const updateCategoryIdState = (event : any) => {
        setCategoryId(event.target.value);
    };

    const updateDescriptionState = (event : any) => {
        setDescription(event.target.value);
    };

    const updateEndDateState = (event : any) => {
        setEndDate(event.target.value);
    };
    const updateReserveState = (event : any) => {
        setReserve(event.target.value);
    };

    const createAuction = () => {
        axios.post('http://localhost:4941/api/v1/auctions', {title : title, description : description, categoryId: categoryId, endDate: endDate, reserve: reserve}, {
            headers: {
                "X-Authorization": users.token
            }})
            .then((response) => {
                navigate('/auctions');
                console.log(response.data);
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
                console.log(error.toString());
            })
    }


    if(errorMessage == "AxiosError: Request failed with status code 401") {
        return (
            <div>
                <h1>Create Auction</h1>
                <Alert severity="error">Unauthorised. Please sign in and Try again</Alert>
                <Button variant="contained" onClick={() => {window.location.href="/auctions/create"}}>
                    Try Again
                </Button>
            </div>
        )
    } else
    return (
        <div>
            <h1>Create Auction</h1>
            <Box
                component="form"
                padding="10"
                noValidate
                autoComplete="off">
                <div>
                    <TextField  label="Title" color="error"  onChange={updateTitleState} value={title} focused/>
                </div>
                <div>
                    <TextField  label="Description" color="error"  onChange={updateDescriptionState} value={description} focused/>
                </div>
                <div>
                    <TextField  label="Category Id" color="error" onChange={updateCategoryIdState} value={categoryId} focused/>
                </div>
                <div>
                    <TextField label="End Date" color="error" onChange={updateEndDateState} value={endDate} focused/>
                </div>
                <div>
                    <TextField label="Reserve" color="error" onChange={updateReserveState} value={reserve} focused/>
                </div>
                <div>
                    <Button variant="contained" color="error" onClick={() =>  {createAuction()}}>Register</Button>
                </div>
            </Box>
        </div>
    );


}
export default AuctionCreate;