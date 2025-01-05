import React from 'react';
import {Link} from 'react-router-dom';
import './NavbarStyle.css';

const Navbar = () => {
    return(
        <nav className="navbar">
            <h1>Dream Home </h1>
            <div className="nav-links">
                <Link to="/">Properties</Link>
                <Link to="/">Favourites</Link>
                <Link to="/">Rent</Link>
                <Link to="/">About Us</Link>
            </div>
        </nav>
    )
};

export default Navbar;