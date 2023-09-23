import React, {useState} from 'react'
import {Nav, Navbar, NavLink} from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css'

const NavBar = () =>{
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  const location = useLocation();
    return (
      <>
        <Navbar
          expand="lg"
          fixed="top"
          expanded={expanded}
          className="justify-content-between"
        >
          <Navbar.Brand as={Link} to="/" className="brandname">
            Navbar
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" onClick={toggleNavbar} />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ml-auto">
              <NavLink
                as={Link}
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </NavLink>
              <NavLink
                as={Link}
                to="/test"
                className={location.pathname === "/test" ? "active" : ""}
              >
                Second
              </NavLink>
              <NavLink
                as={Link}
                to="/expenses"
                className={location.pathname === "/expenses" ? "active" : ""}
              >
                Expenses
              </NavLink>
              <NavLink
                as={Link}
                to="/categories"
                className={location.pathname === "/categories" ? "active" : ""}
              >
                Categories
              </NavLink>
              <NavLink
                as={Link}
                to="/accounts"
                className={location.pathname === "/accounts" ? "active" : ""}
              >
                Accounts
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
      /*
      can also do and  wrap all this inside a header
      <nav> <ul> 
        <li> 
        <Link to="/">  Home </Link>
        </li>
      </ul></nav> 
      */
    );
}

export default NavBar;