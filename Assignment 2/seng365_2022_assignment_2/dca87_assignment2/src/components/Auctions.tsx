import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button, InputAdornment, TextField} from "@mui/material";
import auction from "./Auction";
import Auction from "./Auction";
import { AccountCircle } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';


const Auctions = () => {


    const [auctions, setAuctions] = React.useState<Array<Auction>>([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
        getAuctions()
    }, [])


    const getAuctions = () => {
        axios.get('http://localhost:4941/api/v1/auctions')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setAuctions(response.data.auctions)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }


    const category_names_set = (categoryId : number) =>
    {
            switch (categoryId) {
                case 1:
                    return <td>Smartphones</td>
                case 2:
                    return <td>Computers & Laptops</td>
                case 3:
                    return <td>Books</td>
                case 4:
                    return <td>CDs</td>
                case 5:
                    return <td>DVDs</td>
                case 6:
                    return <td>Motorbikes</td>
                case 7:
                    return <td>Bicycles</td>
                case 8:
                    return <td>Farm Equipment</td>
                case 9:
                    return <td>Jewellery</td>
                case 10:
                    return <td>Homeware</td>
                case 11:
                    return <td>Furniture</td>
                case 12:
                    return <td>Watches</td>
                case 13:
                    return <td>Instruments</td>
                case 14:
                    return <td>Electronics</td>
                case 15:
                    return <td>Office Equipment</td>
                case 16:
                    return <td>Tablets</td>
                case 17:
                    return <td>Paintings & Sculptures</td>
                case 18:
                    return <td>Bulk Items</td>
                case 19:
                    return <td>Gaming Consoles</td>
                case 20:
                    return <td>Hair Care</td>
                case 21:
                    return <td>Perfume</td>
                case 22:
                    return <td>Clothing</td>
                case 23:
                    return <td>Lego</td>
                case 24:
                    return <td>Figurines</td>
                case 25:
                    return <td>Cars</td>
            }
    }
    const list_of_auctions = () =>
    {

        return  auctions.map((item: Auction) =>
           <tr>
               <th scope="row">
               <Link to={"/auctions/" + item.auctionId}> {item.title} </Link>
               </th>
               <td>{category_names_set(item.categoryId)}</td>
               <td>{item.endDate}</td>
               <td>{item.sellerId}</td>
               <td>{item.reserve}</td>
               <td>
                   <Link to={"/auctions/" + item.auctionId}>
                       <img src={'http://localhost:4941/api/v1/auctions/' + item.auctionId + '/image'} alt=""   onError={({ currentTarget }) => {
                           currentTarget.onerror = null;
                           currentTarget.src="https://www.kindpng.com/picc/m/347-3477302_updating-icon-clipart-png-download-auction-white-icon.png";
                       }} width="200px" height="200px"/>
                   </Link>
               </td>
               <td>
                   <img src={'http://localhost:4941/api/v1/users/' + item.sellerId + '/image'} alt=""   onError={({ currentTarget }) => {
                           currentTarget.onerror = null;
                           currentTarget.src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
                       }} width="200px" height="200px"/>
               </td>
           </tr>)
    }

    if(errorFlag) {
        return (
            <div>
                <h1>Auctions</h1>
                <div style={{color:"red"}}>
                    {errorMessage}
                </div>
            </div>
        )
    } else {
        return (
            <div className="App-header">
                <h1>Auctions</h1>
                <Button variant="contained">
                    <Link to={"/auctions/create"}> Create Auction </Link>
                </Button>
                <div>
                    <TextField id="input-with-sx" label="Search"
                               InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                               variant="standard" />
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Closing time</th>
                        <th scope="col">Seller Id</th>
                        <th scope="col">Reserve</th>
                        <th scope="col">Image</th>
                        <th scope="col">Seller Image</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list_of_auctions()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Auctions;