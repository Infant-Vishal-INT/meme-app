import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "../assets/css/navbar.css";

const NavbarComponent = () => {
  const location = useLocation();

  return (
    <Navbar bg="primary">
      <Container>
        <Navbar.Brand className="navbar-brand-name">Hello, Vishal</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Link to="/fav_memes" className="me-4">
            {location.pathname == "/memes" ? (
              <AiOutlineHeart color="white" fontSize="2em" />
            ) : (
              <AiFillHeart color="red" fontSize="2em" />
            )}
          </Link>
          <Link to="/">
            <button className="btn btn-dark">Logout</button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
