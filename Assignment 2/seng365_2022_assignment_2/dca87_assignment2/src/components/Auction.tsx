import React from "react";
import axios from "axios"
import {Link, useNavigate, useParams} from 'react-router-dom'
import {
    Accordion,
    AccordionDetails, AccordionSummary,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useUserStore} from "../Store";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [categories, setCategories] = React.useState("");

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

    const setDefaultImage = () => {
        setAuctionImage("https://www.kindpng.com/picc/m/347-3477302_updating-icon-clipart-png-download-auction-white-icon.png");
    }
    const getAuction = () => {
        axios.get('http://localhost:4941/api/v1/auctions/' + id)
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setAuction(response.data)
                getAuctions()
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
            highestBid: 0,
            numBids: 0,
            sellerFirstName: "",
            sellerLastName: "",
            auctionId: 0,
            categoryId: 0,
            description: "",
            endDate: "",
            imageFilename: "",
            reserve: 0,
            sellerId: 0,
            title: ""
        })
        setOpenEditDialog(false);
    };

    const handleDeleteDialogOpen = (auction: Auction) => {
        setDialogAuction(auction)
        setOpenDeleteDialog(true);
    };
    const handleDeleteDialogClose = () => {
        setDialogAuction({
            highestBid: 0,
            numBids: 0,
            sellerFirstName: "",
            sellerLastName: "",
            auctionId: 0,
            categoryId: 0,
            description: "",
            endDate: "",
            imageFilename: "",
            reserve: 0,
            sellerId: 0,
            title: ""
        })
        setOpenDeleteDialog(false);
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
            .then(() => {
                setErrorFlag(false)
                setErrorMessage("")
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const deleteAuction = (auction: Auction) => {
        axios.delete('http://localhost:4941/api/v1/auctions/' + auction.auctionId, {
            headers: {
                "X-Authorization": users.token
            }
        })
            .then(() => {
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
    }, [])

    const category_names_set = (categoryId: number) => {
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



    const editAuctionNewImage = (image: any) => {
        axios.put('http://localhost:4941/api/v1/auctions/' + auction.auctionId + '/image', image,
            {
                headers: {
                    "X-Authorization": users.token,
                    "Content-Type": image.type
                }
            }
        )
            .then(() => {
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

    const [bid, setBid] = React.useState(0);
    const updateBid = (Event: any) => {
        const b = Event.target.value;
        setBid(b);
    }

    const postBid = () => {
        axios.post('http://localhost:4941/api/v1/auctions/' + auction.auctionId + '/bids', {
                amount: Number(bid)
            },
            {
                headers: {
                    "X-Authorization": users.token,
                }
            }
        )
            .then(() => {
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

    const make_bid = () => {
        if (users.token !== "" && auction.sellerId !== users.userId) {
            return (
                <div>
                    <TextField label="Make Bid" onChange={updateBid} value={bid} focused/>
                    <Button onClick={postBid} variant="outlined">Make Bid</Button>
                </div>
            )
        }
    }

    const convert_to_day = (day: any) => {
        const d = new Date(day);
        return d.getDay();
    }

    const convert_to_date = (day: any) => {
        const d = new Date(day);
        return (d.getHours() + ':' + d.getMinutes() + ',' + (d.getDay() + 1) + '/' + (d.getMonth() + 1) + '/'  + d.getFullYear());
    }

    const [auctionsC, setAuctionsC] = React.useState<Array<Auction>>([])
    const [auctionsS, setAuctionsS] = React.useState<Array<Auction>>([])

    const [auctionBids, setAuctionBids] = React.useState<Array<AuctionBid>>([])

    const getAuctionBids = () => {
        axios.get('http://localhost:4941/api/v1/auctions/' + auction.auctionId + '/bids')
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setAuctionBids(response.data)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }
    const getAuctions = () => {
        axios.get('http://localhost:4941/api/v1/auctions?startIndex=0&categoryIds=' + auction.categoryId)
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setAuctionsC(response.data.auctions)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
        axios.get('http://localhost:4941/api/v1/auctions?startIndex=0&sellerId=' + auction.sellerId)
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                setAuctionsS(response.data.auctions)
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    const [seconds, setSeconds] = React.useState(0);
React.useEffect(() => {
    const interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        getAuctions()
        getAuctionBids()
    }, 1000);
    return () => clearInterval(interval);
}, )

    const list_of_auctionsC = () =>
    {
        return  auctionsC.map((item: Auction) =>
            <TableRow>
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            <Link to={"/auctions/" + item.auctionId}> {item.title} </Link>
                        </Typography>
                        <Link to={"/auctions/" + item.auctionId}>
                            <img src={'http://localhost:4941/api/v1/auctions/' + item.auctionId + '/image'} alt=""   onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src="https://www.kindpng.com/picc/m/347-3477302_updating-icon-clipart-png-download-auction-white-icon.png";
                            }} width="200px" height="200px"/>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                    <Typography color="text.secondary" variant="body2">
                                        Seller: {item.sellerFirstName} {item.sellerLastName}
                                    </Typography>
                                <Typography color="text.secondary" variant="body2">
                                        <img src={'http://localhost:4941/api/v1/users/' + item.sellerId + '/image'} alt=""   onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
                                        }} width="200px" height="200px"/>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" component="div">
                                Reserve: ${item.reserve}
                            </Typography>
                            <Typography color="text.secondary" variant="body2">
                                Category: {category_names_set(item.categoryId)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {convert_to_day(item.endDate)} Days left
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Number of Bids: {item.numBids}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Current Bid: ${item.highestBid}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider variant="middle">
                </Divider>
            </TableRow>)
    }

    const list_of_auctionsS = () =>
    {

        return  auctionsS.map((item: Auction) =>
            <TableRow>
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            <Link to={"/auctions/" + item.auctionId}> {item.title} </Link>
                        </Typography>
                        <Link to={"/auctions/" + item.auctionId}>
                            <img src={'http://localhost:4941/api/v1/auctions/' + item.auctionId + '/image'} alt=""   onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src="https://www.kindpng.com/picc/m/347-3477302_updating-icon-clipart-png-download-auction-white-icon.png";
                            }} width="200px" height="200px"/>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                    <Typography color="text.secondary" variant="body2">
                                        Seller: {item.sellerFirstName} {item.sellerLastName}
                                    </Typography>
                                <Typography color="text.secondary" variant="body2">
                                        <img src={'http://localhost:4941/api/v1/users/' + item.sellerId + '/image'} alt=""   onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
                                        }} width="200px" height="200px"/>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" component="div">
                                Reserve: ${item.reserve}
                            </Typography>
                            <Typography color="text.secondary" variant="body2">
                                Category: {category_names_set(item.categoryId)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {convert_to_day(item.endDate)} Days left
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Number of Bids: {item.numBids}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Current Bid: ${item.highestBid}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider variant="middle">
                </Divider>
            </TableRow>)
    }

    const highest_bidder = () => {
        return  auctionBids.map((item: AuctionBid) =>
            <Grid item>
                <Typography gutterBottom variant="subtitle1" component="div">
                    Bidder: {item.first_name} {item.last_name}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                        <img src={'http://localhost:4941/api/v1/users/' + item.bidder_id + '/image'} alt=""   onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
                        }} width="200px" height="200px"/>
                </Typography>
                <Divider variant="middle">
                </Divider>
            </Grid>)
    }

    const list_of_auctions_bids = () =>
    {
        return  auctionBids.map((item: AuctionBid) =>
            <TableRow>
                <Paper       sx={{
                    display: 'flex',
                    '& > :not(style)': {
                        m: 1,
                        width: '100%',
                        height: '100%',
                    },
                }} variant="outlined" square >
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            ${item.amount} at time: {convert_to_date(item.timestamp)}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            Bidder: {item.first_name} {item.last_name}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                                <img src={'http://localhost:4941/api/v1/users/' + item.bidder_id + '/image'} alt=""   onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
                                }} width="200px" height="200px"/>
                        </Typography>
                        <Divider variant="middle">
                        </Divider>
                    </Grid>
                <Divider variant="middle">
                </Divider>
                </Grid>
                </Paper>
            </TableRow>)
    }

    const get_delete = () => {
        if (users.userId == auction.sellerId && auctionBids.length == 0) {
            return (
                <Box>
                    <Button variant="contained" onClick={() => {
                        handleDeleteDialogOpen(auction)
                    }}>Delete</Button>
                    <Dialog
                        open={openDeleteDialog}
                        onClose={handleDeleteDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            {"Delete Auction?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to Delete this auction?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                            <Button variant="contained" onClick={() =>  {deleteAuction(auction)}}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            )
        }

    }

    const get_edit = () => {
        if (users.userId == auction.sellerId && auctionBids.length == 0) {
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
        console.log(errorMessage.toString() == "AxiosError: Request failed with status code 403")
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
                    <Paper>
                        <h1>{auction.title}</h1>
                            <div>
                                <img src={auctionImage} alt="" onError={setDefaultImage} width="500px" height="500px"/>
                            </div>
                        <Divider variant="middle">
                        </Divider>
                        <h2>End Date</h2>
                        <p>{convert_to_date(auction.endDate)}</p>
                        <Divider variant="middle">
                        </Divider>
                        <h2>Description</h2>
                        <p>{auction.description}</p>
                        <Divider variant="middle">
                        </Divider>
                        <h2>Seller:</h2>
                        <p> {sellerFirstName} {sellerLastName}</p>
                        <img src={'http://localhost:4941/api/v1/users/' + auction.sellerId + '/image'} alt=""   onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
                        }} width="200px" height="200px"/>
                        <Divider variant="middle">
                        </Divider>
                        <h2>Category:</h2>
                        <p>{category_names_set(auction.categoryId)}</p>
                        <Divider variant="middle">
                        </Divider>
                        <h2>Reserve: ${auction.reserve}</h2>
                        <Divider variant="middle">
                        </Divider>
                        <h2>Highest Bid: ${auction.highestBid}
                            {highest_bidder()}</h2>
                        <Divider variant="middle">
                        </Divider>
                        <h2>Number of Bids: {auction.numBids}</h2>
                        <Divider variant="middle">
                        </Divider>
                        {make_bid()}
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
                        <Divider variant="middle">
                        </Divider>
                    </Paper>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Bids Made</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid>
                                <Paper sx={{ width: '100%', mb: 10 }}>
                                    <TableContainer>
                                        <Table
                                            sx={{ minWidth: 750 }}
                                            aria-labelledby="tableTitle"
                                            size={'medium'}>
                                            <TableHead>
                                                Bids Made
                                            </TableHead>
                                            <TableBody>
                                                {list_of_auctions_bids()}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Similar Auctions By Category</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid>
                                <Paper sx={{ width: '100%', mb: 10 }}>
                                    <TableContainer>
                                        <Table
                                            sx={{ minWidth: 750 }}
                                            aria-labelledby="tableTitle"
                                            size={'medium'}>
                                            <TableHead>
                                                Similar Auctions By Category
                                            </TableHead>
                                            <TableBody>
                                                {list_of_auctionsC()}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Other Auctions By the Seller</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid>
                                <Paper sx={{ width: '100%', mb: 10 }}>
                                    <TableContainer>
                                        <Table
                                            sx={{ minWidth: 750 }}
                                            aria-labelledby="tableTitle"
                                            size={'medium'}>
                                            <TableHead>
                                                Other Auctions By the Seller
                                            </TableHead>
                                            <TableBody>
                                                {list_of_auctionsS()}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </div>
        )
    }
}
export default Auction;