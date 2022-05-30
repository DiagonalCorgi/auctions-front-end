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
    Select, styled, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow,
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


    const [sort, setSort] = React.useState("CLOSING_SOON");
    const updateSort = (Event: any) => {
        setSort(Event.target.value);
    }

    const [smartphone, setSmartphone] = React.useState("");
    const filterSmartphone = (Event: any) => {
        if (Event.target.checked) {
            setSmartphone(Event.target.value);
        } else {
            setSmartphone("");
        }
    }
    const [computer, setComputer] = React.useState("");
    const filterComputer = (Event: any) => {
        if (Event.target.checked) {
            setComputer(Event.target.value);
        } else {
            setComputer("");
        }
    }
    const [books, setBooks] = React.useState("");
    const filterBooks = (Event: any) => {
        if (Event.target.checked) {
            setBooks(Event.target.value);
        } else {
            setBooks("");
        }
    }
    const [cd, setCd] = React.useState("");
    const filterCd = (Event: any) => {
        if (Event.target.checked) {
            setCd(Event.target.value);
        } else {
            setCd("");
        }
    }
    const [dvd, setDvd] = React.useState("");
    const filterDvd = (Event: any) => {
        if (Event.target.checked) {
            setDvd(Event.target.value);
        } else {
            setDvd("");
        }
    }
    const [motorbike, setMotorbike] = React.useState("");
    const filterMotorbike = (Event: any) => {
        if (Event.target.checked) {
            setMotorbike(Event.target.value);
        } else {
            setMotorbike("");
        }
    }
    const [bicycle, setBicycle] = React.useState("");
    const filterBicycle = (Event: any) => {
        if (Event.target.checked) {
            setBicycle(Event.target.value);
        } else {
            setBicycle("");
        }
    }
    const [farm, setFarm] = React.useState("");
    const filterFarm = (Event: any) => {
        if (Event.target.checked) {
            setFarm(Event.target.value);
        } else {
            setFarm("");
        }
    }
    const [jewellery, setJewellery] = React.useState("");
    const filterJewellery = (Event: any) => {
        if (Event.target.checked) {
            setJewellery(Event.target.value);
        } else {
            setJewellery("");
        }
    }
    const [homeware, setHomeware] = React.useState("");
    const filterHomeware = (Event: any) => {
        if (Event.target.checked) {
            setHomeware(Event.target.value);
        } else {
            setHomeware("");
        }
    }
    const [furniture, setFurniture] = React.useState("");
    const filterFurniture = (Event: any) => {
        if (Event.target.checked) {
            setFurniture(Event.target.value);
        } else {
            setFurniture("");
        }
    }
    const [watches, setWatches] = React.useState("");
    const filterWatches = (Event: any) => {
        if (Event.target.checked) {
            setWatches(Event.target.value);
        } else {
            setWatches("");
        }
    }
    const [instruments, setInstruments] = React.useState("");
    const filterInstruments = (Event: any) => {
        if (Event.target.checked) {
            setInstruments(Event.target.value);
        } else {
            setInstruments("");
        }
    }
    const [electronics, setElectronics] = React.useState("");
    const filterElectronics = (Event: any) => {
        if (Event.target.checked) {
            setElectronics(Event.target.value);
        } else {
            setElectronics("");
        }
    }
    const [office, setOffice] = React.useState("");
    const filterOffice = (Event: any) => {
        if (Event.target.checked) {
            setOffice(Event.target.value);
        } else {
            setOffice("");
        }
    }
    const [tablets, setTablets] = React.useState("");
    const filterTablets = (Event: any) => {
        if (Event.target.checked) {
            setTablets(Event.target.value);
        } else {
            setTablets("");
        }
    }
    const [paint, setPaint] = React.useState("");
    const filterPaint = (Event: any) => {
        if (Event.target.checked) {
            setPaint(Event.target.value);
        } else {
            setPaint("");
        }
    }
    const [bulk, setBulk] = React.useState("");
    const filterBulk = (Event: any) => {
        if (Event.target.checked) {
            setBulk(Event.target.value);
        } else {
            setBulk("");
        }
    }
    const [gaming, setGaming] = React.useState("");
    const filterGaming = (Event: any) => {
        if (Event.target.checked) {
            setGaming(Event.target.value);
        } else {
            setGaming("");
        }
    }
    const [hair, setHair] = React.useState("");
    const filterHair = (Event: any) => {
        if (Event.target.checked) {
            setHair(Event.target.value);
        } else {
            setHair("");
        }
    }
    const [perfume, setPerfume] = React.useState("");
    const filterPerfume = (Event: any) => {
        if (Event.target.checked) {
            setPerfume(Event.target.value);
        } else {
            setPerfume("");
        }
    }
    const [clothing, setClothing] = React.useState("");
    const filterClothing = (Event: any) => {
        if (Event.target.checked) {
            setClothing(Event.target.value);
        } else {
            setClothing("");
        }
    }
    const [lego, setLego] = React.useState("");
    const filterLego = (Event: any) => {
        if (Event.target.checked) {
            setLego(Event.target.value);
        } else {
            setLego("");
        }
    }
    const [figurines, setFigurines] = React.useState("");
    const filterFigurines = (Event: any) => {
        if (Event.target.checked) {
            setFigurines(Event.target.value);
        } else {
            setFigurines("");
        }
    }
    const [cars, setCars] = React.useState("");
    const filterCars = (Event: any) => {
        if (Event.target.checked) {
            setCars(Event.target.value);
        } else {
            setCars("");
        }
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
            axios.get('http://localhost:4941/api/v1/auctions?startIndex='+startIndex +
                smartphone + computer + books + cd + dvd + motorbike + bicycle + farm +
                jewellery + homeware + furniture + watches + instruments + electronics
                + office + tablets + paint + bulk + gaming + hair + perfume + clothing +
                lego + figurines + cars + "&sortBy=" + sort )
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    setAuctions(response.data.auctions)
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        else {
            axios.get('http://localhost:4941/api/v1/auctions?startIndex='+startIndex + '&q='+ search +
                smartphone + computer + books + cd + dvd + motorbike + bicycle + farm + jewellery +
                homeware + furniture + watches + instruments + electronics + office + tablets + paint +
                bulk + gaming + hair + perfume + clothing + lego + figurines + cars + "&sortBy=" + sort)
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    setAuctions(response.data.auctions)
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
    const [rowsPerPage, setRowsPerPage] = React.useState(5);



    const convert_to_day = (day: any) => {
        const d = new Date(day);
        return d.getDay();
    }

    const convert_to_date = (day: any) => {
        const d = new Date(day);
        return (d.getHours() + ':' + d.getMinutes() + ',' + (d.getDay() + 1) + '/' + (d.getMonth() + 1) + '/'  + d.getFullYear());
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const pagination = () => {
        return (
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={auctions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            )

    }

    const list_of_auctions = () =>
    {

        return  auctions.map((item: Auction) =>
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
                           <Typography color="subtitle1" variant="subtitle1">
                               Category: {category_names_set(item.categoryId)}
                           </Typography>
                           <Typography variant="subtitle1" color="text.secondary">
                              Closing Date: {convert_to_date(item.endDate)}
                           </Typography>
                           <Typography variant="subtitle1" color="text.secondary">
                               Number of Bids: {item.numBids}
                           </Typography>
                           <Typography variant="subtitle1" color="text.secondary">
                               Current Highest Bid: ${item.highestBid}
                           </Typography>
                       </Grid>
                   </Grid>
               </Grid>
               <Divider variant="middle">
               </Divider>
           </TableRow>)
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
                            <Button variant="contained" color='warning'>
                                <Link to={"/auctions/create"}> Create Auction </Link>
                            </Button>
                        </Item>
                    </Grid>
                        <Grid item xs={4}>
                            <TextField label="Search"
                                       onChange={updateSearchState}
                                       value={search}
                                       InputProps={{startAdornment: (
                                               <InputAdornment position="start">
                                                   <SearchIcon />
                                               </InputAdornment>),
                                       }}
                                       variant="outlined" />
                            <Paper sx={{ width: '100%', mb: 10 }}>
                            <Grid item>
                                <FormControlLabel value={'&categoryIds=1'} control={<Checkbox onChange={filterSmartphone}/>} label="Smartphones" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=2'} control={<Checkbox onChange={filterComputer}/>} label="Computers & Laptops" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=3'} control={<Checkbox onChange={filterBooks}/>} label="Books" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=4'} control={<Checkbox onChange={filterCd}/>} label="CDs" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=5'} control={<Checkbox onChange={filterDvd}/>} label="DVDs" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=6'} control={<Checkbox onChange={filterMotorbike}/>} label="Motorbikes" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=7'} control={<Checkbox onChange={filterBicycle}/>} label="Bicycles" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=8'} control={<Checkbox onChange={filterFarm}/>} label="Farm Equipment" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=9'} control={<Checkbox onChange={filterJewellery}/>} label="Jewellery" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=10'} control={<Checkbox onChange={filterHomeware}/>} label="Homeware" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=11'} control={<Checkbox onChange={filterFurniture}/>} label="Furniture" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=12'} control={<Checkbox onChange={filterWatches}/>} label="Watches" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=13'} control={<Checkbox onChange={filterInstruments}/>} label="Instruments" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=14'} control={<Checkbox onChange={filterElectronics}/>} label="Electronics" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=15'} control={<Checkbox onChange={filterOffice}/>} label="Office Equipment" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=16'} control={<Checkbox onChange={filterTablets}/>} label="Tablets" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=17'} control={<Checkbox onChange={filterPaint}/>} label="Paintings & Sculptures" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=18'} control={<Checkbox onChange={filterBulk}/>} label="Bulk Items" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=19'} control={<Checkbox onChange={filterGaming}/>} label="Gaming Consoles" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=20'} control={<Checkbox onChange={filterHair}/>} label="Hair Care" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=21'} control={<Checkbox onChange={filterPerfume}/>} label="Perfume" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=22'} control={<Checkbox onChange={filterClothing}/>} label="Clothing" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=23'} control={<Checkbox onChange={filterLego}/>} label="Lego" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=24'} control={<Checkbox onChange={filterFigurines}/>} label="Figurines" labelPlacement="top"/>
                                <FormControlLabel value={'&categoryIds=25'} control={<Checkbox onChange={filterCars}/>} label="Cars" labelPlacement="top"/>
                            </Grid>
                            </Paper>
                            <Grid>
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
                                <Button variant="contained" color='warning' onClick={getAuctions} >
                                    <Link  to={"/auctions"}>Search</Link>
                                </Button>
                            </Grid>
                        </Grid>
                    <Paper sx={{ width: '100%', mb: 10 }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}>
                            <TableHead>
                                Results
                            </TableHead>
                            <TableBody>
                                {list_of_auctions()}
                            </TableBody>
                        </Table>

                    </TableContainer>
                </Paper>
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