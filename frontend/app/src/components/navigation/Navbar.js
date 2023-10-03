import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import Container from "react-bootstrap/Container";


const NavBar = () => {
    return (
    <Navbar > 
        <Container>
            <Navbar.Brand href="/"> FT </Navbar.Brand>
            <Navbar.Toggle />
        </Container>
    </Navbar>
    );
}

export default NavBar;