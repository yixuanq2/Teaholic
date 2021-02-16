import React from 'react';
import {Nav, Navbar} from "react-bootstrap";

function Mynavbar(props) {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href={`/${props.name}`}>{props.name.toUpperCase()}</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/menu">Choose</Nav.Link>
                    {/*<Nav.Link href="/recipe">Recipe</Nav.Link>*/}
                    <Nav.Link href="/add">Share</Nav.Link>
                    <Nav.Link href="/search">Discover</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Mynavbar;