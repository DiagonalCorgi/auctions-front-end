import React from 'react';
import './App.css';
import Auctions from "./components/Auctions";
import User from "./components/User";
import Home from "./components/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import Auction from "./components/Auction";
import AuctionCreate from "./components/AuctionCreate";

function App() {
  return (
      <div className="App">
        <Router>
            <div>
                <Navigation/>
            </div>
          <div>
            <Routes>
                <Route path="/auctions/create" element={<AuctionCreate/>}/>
                <Route path="/users/login" element={<Login/>}/>
                <Route path="/users/register" element={<Register/>}/>
                <Route path="/auctions" element={<Auctions/>}/>
                <Route path="/auctions/:id" element={<Auction/>}/>
                <Route path="/users/:id" element={<User/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;
