import * as React from 'react';
import Box from '@mui/material/Box';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import Auctions from "./Auctions";



const Home = () => {
    return (

        <React.Fragment>
            <h1>Home</h1>
            <Box>
                <Auctions/>
            </Box>
        </React.Fragment>

    )
}
export default Home;