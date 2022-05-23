import React from "react";
import axios from "axios"
import {Link, useNavigate, useParams} from 'react-router-dom'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider
} from "@mui/material";
import User from "./User";
import {Image} from "@mui/icons-material";

const Auction = () => {
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const {id} = useParams();
    const [auction, setAuction] = React.useState<Auction>({
            auctionId: 0, categoryId: 0, imageFilename: "", description: "", endDate: "", reserve: 0, sellerId: 0, title: ""
        }
    )
    const [categories, setCategories] = React.useState<Categories>( {
        categoryId : 0, name: ""
    });

    const [sellerFirstName, setSellerFirstName] = React.useState("");
    const [sellerLastName, setSellerLastName] = React.useState("");
    const [image, setImage] = React.useState();
    const [categoryName, setCategoryName] = React.useState("");


    const getAuction = () => {
        axios.get('http://localhost:4941/api/v1/auctions/' + id)
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setAuction(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    React.useEffect(() => {
        getAuction();
    }, [id])

    const getSeller = () => {
        axios.get('http://localhost:4941/api/v1/users/' + auction.sellerId)
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setSellerFirstName(response.data.firstName);
                setSellerLastName(response.data.lastName)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    React.useEffect(() => {
        getSeller();
    }, [auction.sellerId])

    const getAuctionImage = () => {
        axios.get('http://localhost:4941/api/v1/auctions/' + auction.auctionId + '/image')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setImage(response.data);
                console.log(response.data);
                console.log(auction.auctionId);
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }
    React.useEffect(() => {
        getAuctionImage()
    },[])

    const getCategoryId = () => {
        axios.get('http://localhost:4941/api/v1/auctions/categories')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setCategories(response.data);
                setCategoryName(response.data.name);
                console.log(categories);
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    React.useEffect(() => {
        getCategoryId();
    },[])

    if (errorFlag) {
        return (
            <div>
                <h1>Auction</h1>
                <div style={{color: "red"}}>
                    {errorMessage}
                </div>
                <Link to={"/auctions"}>Back to Auctions</Link>
            </div>
        )
    } else {
        return (
                <div className="App-header">
                    <h1>{auction.title}</h1>
                    <Divider variant="middle">
                    </Divider>
                    <img src={image} alt={""}/>
                    <Divider variant="middle">
                    </Divider>
                    <h2>End Date</h2>
                    <p>{auction.endDate}</p>
                    <Divider variant="middle">
                    </Divider>
                    <h2>Description</h2>
                    <p>{auction.description}</p>
                    <Divider variant="middle">
                    </Divider>
                    <h2>Seller Name:</h2>
                    <p> {sellerFirstName} {sellerLastName}</p>
                    <Divider variant="middle">
                    </Divider>
                    <h2>Category Id: {auction.categoryId}</h2>
                    <Divider variant="middle">
                    </Divider>
                    <h2>Category Name: {categories.name}</h2>
                    <Divider variant="middle">
                    </Divider>
                    <h2>Reserve: ${auction.reserve}</h2>
                </div>

        )
    }
}
export default Auction;