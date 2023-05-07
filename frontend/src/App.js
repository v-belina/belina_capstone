import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";
//ITEMS
import ItemsPage from "./components/pages/items/itemsPage";
import NavbarItems from "./components/pages/items/itemsNavbar";
import CreateItem from "./components/pages/items/createItem";
import EditItem from "./components/pages/items/editItems";
import Item from "./components/pages/items/items";
import ItemsList from "./components/pages/items/ItemsLIst";
//TICKETS
import CreateTicket from "./components/pages/ticket/ticketsNew";
import TicketList from "./components/pages/ticket/ticketsList";
import TicketForm from "./components/pages/ticket/ticketEdit";

export const UserContext = createContext();
//test change
//test again
const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          
          <Route exact path="/viewItems" element={<ItemsPage />} />
          <Route exact path="/createNewItem" element={<CreateItem />} />
          <Route exact path="/editItem/:id" element={<EditItem />} /> 
          <Route exact path="/viewItemsList" element={<ItemsList/>} /> 
          <Route exact path="/item" element={<Item/>} /> 

          <Route exact path="/createTicket" element={<CreateTicket/>} />  
          <Route exact path="/viewTickets" element={<TicketList/>} />   
          <Route exact path="/editTicket/:id" element={<TicketForm/>} />  
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
