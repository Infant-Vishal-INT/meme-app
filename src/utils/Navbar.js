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
          {location.pathname == "/memes" ? (
            <Link to="/fav_memes" className="me-4">
              <AiOutlineHeart color="white" fontSize="2em" />
            </Link>
          ) : location.pathname == "/fav_memes" ? (
            <Link to="/memes">
              <button className="btn btn-light me-4">All memes</button>
            </Link>
          ) : null}

          <Link to="/">
            <button className="btn btn-dark">Logout</button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
