import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
    Alert,
    Button,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    NativeSelect,
    Select
} from "@mui/material";
import * as React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "../Store";
import {DateTimePicker} from "@mui/x-date-pickers";


const AuctionCreate = () => {

    const users = useUserStore(state => state.user)

    const navigate = useNavigate();
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [categoryId, setCategoryId] = React.useState(1);
    const [endDate, setEndDate] = React.useState(``);
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
                    <TextField  label="Title"  onChange={updateTitleState} value={title} focused/>
                </div>
                <div>
                    <TextField  label="Description"  onChange={updateDescriptionState} value={description} focused/>
                </div>
                <div>
                        <InputLabel>Category</InputLabel>
                        <Select
                            color="primary"
                            value={categoryId}
                            label="Category"
                            onChange={updateCategoryIdState}
                        >
                            <MenuItem value={1}>Smartphones</MenuItem>
                            <MenuItem value={2}>Computers & Laptops</MenuItem>
                            <MenuItem value={3}>Books</MenuItem>
                            <MenuItem value={4}>CDs</MenuItem>
                            <MenuItem value={5}>DVDs</MenuItem>
                            <MenuItem value={6}>Motorbikes</MenuItem>
                            <MenuItem value={7}>Bicycles</MenuItem>
                            <MenuItem value={8}>Farm Equipment</MenuItem>
                            <MenuItem value={9}>Jewellery</MenuItem>
                            <MenuItem value={10}>Homeware</MenuItem>
                            <MenuItem value={11}>Furniture</MenuItem>
                            <MenuItem value={12}>Watches</MenuItem>
                            <MenuItem value={13}>Instruments</MenuItem>
                            <MenuItem value={14}>Electronics</MenuItem>
                            <MenuItem value={15}>Office Equipment</MenuItem>
                            <MenuItem value={16}>Tablets</MenuItem>
                            <MenuItem value={17}>Paintings & Sculptures</MenuItem>
                            <MenuItem value={18}>Bulk Items</MenuItem>
                            <MenuItem value={19}>Gaming Consoles</MenuItem>
                            <MenuItem value={20}>Hair Care</MenuItem>
                            <MenuItem value={21}>Perfume</MenuItem>
                            <MenuItem value={22}>Clothing</MenuItem>
                            <MenuItem value={23}>Lego</MenuItem>
                            <MenuItem value={24}>Figurines</MenuItem>
                            <MenuItem value={25}>Cars</MenuItem>
                        </Select>
                </div>
                <div>
                    <TextField
                        id="datetime-local"
                        label="Auction Closes"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        onChange={updateEndDateState}
                        value={endDate}
                        sx={{ width: 250 }}
                        focused
                    />
                </div>
                <div>
                    <TextField label="Reserve" onChange={updateReserveState} value={reserve} focused/>
                </div>
                <div>
                    <Button variant="contained" onClick={() =>  {createAuction()}}>Register</Button>
                </div>
            </Box>
        </div>
    );


}
export default AuctionCreate;