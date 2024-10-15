import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import Admin from './pages/admin/Admin';
import axios from 'axios';
import Home from './pages/Home';
import CreateListing from './pages/listing/CreateListing';
import Location from './pages/location/Location';
import LocationInfo from './pages/location/LocationInfo';
import Listing from './pages/listing/Listing';
import Header from './components/header/Header';
import Listings from './pages/listing/Listings';
import Reservation from './pages/reservation/Reservation';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div className='layout'>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route path='/locations' element={<Location />} />
        <Route path='/locationInfo/:id' element={<LocationInfo />} />
        {/* <Route path='/listing' element={<Listing />} />   */}
        <Route path='/listing' element={<Listing />} />
        <Route path='/listing/:id' element={<Listing />} />
        <Route path='/listings' element={<Listings />} />
        <Route path= '/reservations' element={<Reservation />} />
      </Routes>
    </div>
  )
}

export default App;
