import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {
    Button, ButtonBase, Checkbox,
    Chip, Divider, FormControlLabel, FormGroup,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput, Pagination, PaginationItem, Paper,
    Select, styled, TablePagination,
    TextField, Typography
} from "@mui/material";
import Auction from "./Auction";
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import {unmountComponentAtNode} from "react-dom";


const Auctions = () => {


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const [auctions, setAuctions] = React.useState<Array<Auction>>([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("");


    const [sort, setSort] = React.useState("ALPHABETICAL_ASC");
    const updateSort = (Event: any) => {
        setSort(Event.target.value);
    }

    const [state, setState] = React.useState({
        Smartphones: true,
        Computers: true,
        Books: true,
        CDs: true,
        DVDs: true,
        Motorbikes: true,
        Bicycles: true,
        FarmEquipment: true,
        Jewellery: true,
        Homeware: true,
    });

    const { Smartphones, Computers, Books, CDs, DVDs, Motorbikes, Bicycles, FarmEquipment, Jewellery, Homeware } = state;


    const [categoryArray, setCategoryArray] = React.useState(["categoryIds=1",
        "&categoryIds=2",
        "&categoryIds=3",
        "&categoryIds=4",
        "&categoryIds=5",
        "&categoryIds=6",
        "&categoryIds=7",
        "&categoryIds=8",
        "&categoryIds=9",
        "&categoryIds=10",
        "&categoryIds=11",
        "&categoryIds=12",
        "&categoryIds=13",
        "&categoryIds=14",
        "&categoryIds=15",
        "&categoryIds=16",
        "&categoryIds=17",
        "&categoryIds=18",
        "&categoryIds=19",
        "&categoryIds=20",
        "&categoryIds=21",
        "&categoryIds=22",
        "&categoryIds=23",
        "&categoryIds=24",
        "&categoryIds=25"])

    const [categorySearch, setCategorySearch] = React.useState("");
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event: any) => {
        setCategoryArray(categoryArray.splice(0, event.target.value));
        setCategorySearch(categoryArray.join(''));
        getAuctions();
        setState({
            ...state,
            [event.target.value]: event.target.checked,
        });
    }





    const [search, setSearch] = React.useState("")
    const updateSearchState = (event : any) => {
        setSearch(event.target.value);
    };



    React.useEffect(() => {
        getAuctions()
    }, [])

    const [startIndex, setStartIndex] = React.useState(0);
    const updateStartIndex = (event: any) => {
        setStartIndex(event.target.value)
        getAuctions()
    }

    const getAuctions = () => {
        if (search=="") {
            axios.get('http://localhost:4941/api/v1/auctions?startIndex='+startIndex + "&sortBy=" + sort )
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    setAuctions(response.data.auctions)
                    console.log(categoryArray.join(''));
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        else {
            axios.get('http://localhost:4941/api/v1/auctions?startIndex='+startIndex + '&q='+ search  + "&sortBy=" + sort)
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    setAuctions(response.data.auctions)
                    console.log(categoryArray.join(''));
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }

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

    const [page, setPage] = React.useState(1);



    const convert_to_day = (day: any) => {
        const d = new Date(day);
        return d.getDay();
    }

    const category_filter = () => {
        return (
            <Grid
                sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: "#111111"
        }}
        item>
        <FormControlLabel control={<Checkbox checked={Smartphones} onChange={handleChange}/>} value={0} label="Smartphones" />
        <FormControlLabel control={<Checkbox checked={Computers} onChange={handleChange}/>} value={1} label="Computers & Laptops" />
        <FormControlLabel control={<Checkbox checked={Books} onChange={handleChange}/>} value={2} label="Books" />
        <FormControlLabel control={<Checkbox checked={CDs} onChange={handleChange}/>} value={3} label="CDs" />
        <FormControlLabel control={<Checkbox checked={DVDs} onChange={handleChange}/>} value={4} label="DVDs" />
        <FormControlLabel control={<Checkbox checked={Motorbikes} onChange={handleChange}/>} value={5} label="Motorbikes" />
        <FormControlLabel control={<Checkbox checked={Bicycles} onChange={handleChange}/>} value={6} label="Bicycles" />
        <FormControlLabel control={<Checkbox checked={FarmEquipment} onChange={handleChange}/>} value={7} label="Farm Equipment" />
        <FormControlLabel control={<Checkbox checked={Jewellery} onChange={handleChange}/>} value={8} label="Jewellery" />
        <FormControlLabel control={<Checkbox checked={Homeware} onChange={handleChange}/>} value={9} label="Homeware" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={10} label="Furniture" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={11} label="Watches" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={12} label="Instruments" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={13} label="Electronics" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={14} label="Office Equipment" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={15} label="Tablets" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={16} label="Paintings & Sculptures" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={17} label="Bulk Items" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={18} label="Gaming Consoles" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={19} label="Hair Care" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={20} label="Perfume" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={21} label="Clothing" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={22} label="Lego" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={23} label="Figurines" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChange}/>} value={24} label="Cars" />
    </Grid>
        )
    }

    const list_of_auctions = () =>
    {

        return  auctions.map((item: Auction) =>
           <tr>
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
                               <Link to={"/users/" + item.sellerId}>
                                   <Typography color="text.secondary" variant="body2">
                                      Seller: {item.sellerFirstName} {item.sellerLastName}
                                   </Typography>
                               </Link>
                               <Typography color="text.secondary" variant="body2">
                                   <Link to={"/users/" + item.sellerId}>
                                   <img src={'http://localhost:4941/api/v1/users/' + item.sellerId + '/image'} alt=""   onError={({ currentTarget }) => {
                                       currentTarget.onerror = null;
                                       currentTarget.src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png";
                                   }} width="200px" height="200px"/>
                                   </Link>
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
            <Grid item xs={8}>
                <div className="App-header">
                    <Grid item xs={8} rowSpacing={1}>
                        <Item><h1>Auctions</h1>
                            <Button variant="contained">
                                <Link to={"/auctions/create"}> Create Auction </Link>
                            </Button>
                        </Item>
                    </Grid>
                        <Grid container item xs={8}>
                            <TextField label="Search"
                                       onChange={updateSearchState}
                                       value={search}
                                       InputProps={{startAdornment: (
                                               <InputAdornment position="start">
                                                   <SearchIcon />
                                               </InputAdornment>),
                                       }}
                                       variant="outlined" />
                            <Select
                                value={sort}
                                onChange={updateSort}
                                label="sort"
                            variant="outlined">
                                <MenuItem value={"ALPHABETICAL_ASC"}>Title: A-Z</MenuItem>
                                <MenuItem value={"ALPHABETICAL_DESC"}>Title: Z-A</MenuItem>
                                <MenuItem value={"CLOSING_SOON"}>Closing Soon</MenuItem>
                                <MenuItem value={"CLOSING_LAST"}>Closing Last</MenuItem>
                                <MenuItem value={"BIDS_ASC"}>Lowest Bid</MenuItem>
                                <MenuItem value={"BIDS_DESC"}>Highest Bid</MenuItem>
                                <MenuItem value={"RESERVE_ASC"}>Lowest Reserve</MenuItem>
                                <MenuItem value={"RESERVE_DESC"}>Highest Reserve</MenuItem>
                            </Select>
                            <Button variant="contained" onClick={getAuctions} >
                                <Link  to={"/auctions"}>Search</Link>
                            </Button>
                        </Grid>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Auction</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list_of_auctions()}
                        </tbody>
                    </table>
                    <div>
                        <Button value={0} onClick={updateStartIndex}>
                            1
                        </Button>
                        <Button value={10} onClick={updateStartIndex}>
                            2
                        </Button>
                        <Button value={20} onClick={updateStartIndex}>
                            3
                        </Button>
                        <Button value={30} onClick={updateStartIndex}>
                            4
                        </Button>
                    </div>
                </div>
            </Grid>
        )
    }
}
export default Auctions;