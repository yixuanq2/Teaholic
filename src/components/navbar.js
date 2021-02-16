import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

function Mynavbar(props) {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href={`/${props.name}`}>{props.name.toUpperCase()}</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/">Home</Link></Nav.Link>
                    <Nav.Link><Link to="/login">Login</Link></Nav.Link>
                    <Nav.Link><Link to="/profile">Profile</Link></Nav.Link>
                    <Nav.Link><Link to="/menu">Choose</Link></Nav.Link>
                    {/*<Nav.Link href="/recipe">Recipe</Nav.Link>*/}
                    <Nav.Link><Link to="/add">Share</Link></Nav.Link>
                    <Nav.Link><Link to="/search">Discover</Link></Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Mynavbar;