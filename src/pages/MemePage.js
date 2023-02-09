import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import "../assets/css/navbar.css";
import axios from "axios";

const MemePage = () => {
  const [memeData, setMemeData] = useState([]);
  const [loading, setLoading] = useState();
  useEffect(() => {
    setLoading(true);
    axios
      .get(" https://api.imgflip.com/get_memes")
      .then((response) => {
        setLoading(false);
        setMemeData(response.data.data.memes);
      })
      .catch((err) => console.error("Err", err));
  }, []);
  console.log("loading", loading);
  console.log("Meme data", memeData);
  return (
    <div>
      <Navbar bg="primary">
        <Container>
          <Navbar.Brand className="navbar-brand-name">
            Hello, Vishal
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Link to="/fav_memes" className="me-4">
              <AiOutlineHeart color="white" fontSize="2em" />
            </Link>
            <Link to="/">
              <button className="btn btn-dark">Logout</button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="d-flex flex-row justify-content-center mt-5">
        <input
          type="search"
          className="form-control w-75 me-4"
          placeholder="Search by Meme Name"
        />
        <button className="btn btn-success">Search</button>
      </div>
    </div>
  );
};

export default MemePage;
