import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";


const Auctions = () => {
    const [auctions, setAuctions] = React.useState<Array<Auction>>([])
    const [auctionImage, setAuctionImage] = React.useState("");
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


    const list_of_auctions = () =>
    {

        return  auctions.map((item: Auction) =>
           <tr>
               <th scope="row">
               <Link to={"/auctions/" + item.auctionId}> {item.title} </Link>
               </th>
               <td>{item.endDate}</td>
               <td>{item.categoryId}</td>
               <td>{item.sellerId}</td>
               <td>{item.reserve}</td>
               <td>{item.imageFilename}</td>
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
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Closing time</th>
                        <th scope="col">Category</th>
                        <th scope="col">Seller Id</th>
                        <th scope="col">Reserve</th>
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