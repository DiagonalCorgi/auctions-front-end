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
    Divider, Grid, InputLabel, MenuItem, Select
} from "@mui/material";
import User from "./User";
import {Image} from "@mui/icons-material";
import {useUserStore} from "../Store";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";

const Auction = () => {

    const users = useUserStore(state => state.user)

    const [auctionImage, setAuctionImage] = React.useState("");
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const {id} = useParams();
    const [auction, setAuction] = React.useState<Auction>({
        highestBid: 0, numBids: 0, sellerFirstName: "", sellerLastName: "",
        auctionId: 0, categoryId: 0, imageFilename: "", description: "", endDate: "", reserve: 0, sellerId: 0, title: ""
        }
    )

    const [dialogAuction, setDialogAuction] = React.useState<Auction>({
        highestBid: 0, numBids: 0, sellerFirstName: "", sellerLastName: "",
        auctionId: 0, categoryId: 0, description: "", endDate: "", imageFilename: "", reserve: 0, sellerId: 0, title: ""
    })
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [categories, setCategories] = React.useState( "");

    const [titleEdit, setTitleEdit] = React.useState("");
    const updateTitleEditState = (event: any) => {
        setTitleEdit(event.target.value);
    };

    const [descriptionEdit, setDescriptionEdit] = React.useState("");
    const updateDescriptionEditState = (event: any) => {
        setDescriptionEdit(event.target.value);
    };

    const [categoryEdit, setCategoryEdit] = React.useState(0);
    const updateCategoryEditState = (event: any) => {
        setCategoryEdit(event.target.value);
    };

    const [endDateEdit, setEndDateEdit] = React.useState(auction.endDate);
    const updateEndDateEditState = (event: any) => {
        setEndDateEdit(event.target.value);
    };

    const [reserveEdit, setReserveEdit] = React.useState(0);
    const updateReserveEditState = (event: any) => {
        setReserveEdit(event.target.value);
    };

    const [imageEdit, setImageEdit] = React.useState("");
    const updateAuctionImageState = (event: any) => {
        setImageEdit(event.target.files[0]);
    };

    const navigate = useNavigate();
    const [sellerFirstName, setSellerFirstName] = React.useState("");
    const [sellerLastName, setSellerLastName] = React.useState("");
    const [categoryName, setCategoryName] = React.useState("");

    const setDefaultImage = () => {
        setAuctionImage("https://www.kindpng.com/picc/m/347-3477302_updating-icon-clipart-png-download-auction-white-icon.png");
    }
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

    const handleEditDialogOpen = (auction: Auction) => {
        setDialogAuction(auction)
        setOpenEditDialog(true);
    };
    const handleEditDialogClose = () => {
        setDialogAuction({
            highestBid: 0, numBids: 0, sellerFirstName: "", sellerLastName: "",
            auctionId: 0, categoryId: 0, description: "", endDate: "", imageFilename: "", reserve: 0, sellerId: 0, title: ""
        })
        setOpenEditDialog(false);
    };

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
        setAuctionImage('http://localhost:4941/api/v1/auctions/' + auction.auctionId + '/image')
    }, [auction.sellerId])


    const getCategoryId = () => {
        axios.get('http://localhost:4941/api/v1/auctions/categories?categoryId=' + auction.categoryId)
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setCategoryName(response.data.name);
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const deleteAuction = (auction : Auction) => {
        axios.delete('http://localhost:4941/api/v1/auctions/' + auction.auctionId, {
            headers: {
                "X-Authorization": users.token
            }
        })
            .then((response) => {
                navigate('/auctions')
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const editAuction = () => {
        axios.patch('http://localhost:4941/api/v1/auctions/' + auction.auctionId, {
            title: titleEdit,
            description: descriptionEdit,
            category: categoryEdit,
            endDate: endDateEdit,
            reserve: reserveEdit
        }, {
            headers: {
                "X-Authorization": users.token
            }
        })
            .then((response) => {
                setOpenEditDialog(false);
                navigate('/auctions/' + auction.auctionId)
                getAuction();
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }


    React.useEffect(() => {
        getCategoryId();
    },[])

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

    const get_delete = () => {
        if (users.userId == auction.sellerId) {
            return (
                <button type="button" className="btn btn-primary"
                        data-dismiss="modal"
                        onClick={() => deleteAuction(auction)}>
                    Delete Auction
                </button>
            )
        }

    }

    const editAuctionNewImage = (image: any) => {
        axios.put('http://localhost:4941/api/v1/auctions/' + auction.auctionId + '/image', image,
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
                navigate('/auctions/' + auction.auctionId)
                window.location.reload();
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
                console.log(error.toString());
            })
    }

    const show_upload = () => {
        if (users.userId == auction.sellerId) {
            return (
                <div>
                    <label htmlFor="raised-button-file">
                        <input
                            accept="image/*"
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={updateAuctionImageState}
                        />
                    </label>
                    <Button variant="outlined" onClick={() => {
                        editAuctionNewImage(imageEdit)
                    }} autoFocus>
                        Change Image
                    </Button>
                </div>
            )
        }
    }

    const get_edit = () => {
        if (users.userId == auction.sellerId) {
            return (
                <Box>
                    <Button variant="contained" endIcon={<EditIcon/>} onClick={() => {
                        handleEditDialogOpen(auction)
                    }}>Edit</Button>
                    <Dialog
                        open={openEditDialog}
                        onClose={handleEditDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            {"Edit Auction?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to edit this auction?
                            </DialogContentText>
                            <Box component="form"
                                padding="10"
                                noValidate
                                autoComplete="off">
                                <div>
                                    <TextField  label="Title"  onChange={updateTitleEditState} value={titleEdit} focused/>
                                </div>
                                <div>
                                    <TextField  label="Description"  onChange={updateDescriptionEditState} value={descriptionEdit} focused/>
                                </div>
                                <div>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={categoryEdit}
                                        label="Category"
                                        onChange={updateCategoryEditState}>
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
                                        onChange={updateEndDateEditState}
                                        value={endDateEdit}
                                        sx={{ width: 250 }}
                                        focused
                                    />
                                </div>
                                <div>
                                    <TextField label="Reserve" onChange={updateReserveEditState} value={reserveEdit} focused/>
                                </div>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleEditDialogClose}>Cancel</Button>
                            <Button variant="contained" onClick={() =>  {editAuction()}}>Edit</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            )
        }
    }

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
                        <div>
                            <img src={auctionImage} alt="" onError={setDefaultImage} width="200px" height="200px"/>
                        </div>
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
                    <h2>Category:</h2>
                    <p>{category_names_set(auction.categoryId)}</p>
                    <Divider variant="middle">
                    </Divider>
                    <h2>Reserve: ${auction.reserve}</h2>
                    <Divider variant="middle">
                    </Divider>
                    <h2>Highest Bid: ${auction.highestBid}</h2>
                    <Divider variant="middle">
                    </Divider>
                    <h2>Number of Bids: {auction.numBids}</h2>
                    <Divider variant="middle">
                    </Divider>
                    {get_edit()}
                    <Divider variant="middle">
                    </Divider>
                    {get_delete()}
                    <Divider variant="middle">
                    </Divider>
                    {show_upload()}
                    <Divider variant="middle">
                    </Divider>

                </div>


        )
    }
}
export default Auction;