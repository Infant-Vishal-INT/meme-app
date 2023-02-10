import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavMeme } from "../redux/actions";
import "../assets/css/navbar.css";
import "../assets/css/memePage.css";

const FavMemesPage = () => {
  const dispatch = useDispatch();
  const favMemeArr = useSelector((state) => state.favMemeReducer.favMemeArr);

  const handleDeleteFavMemes = (meme) => {
    const index = favMemeArr.indexOf(meme);
    dispatch(deleteFavMeme(index));
  };
  console.log("fav meme array ==>", favMemeArr);

  return (
    <div className="meme-page-bg">
      <Navbar bg="primary">
        <Container>
          <Navbar.Brand className="navbar-brand-name">
            Hello, Vishal
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Link to="/fav_memes" className="me-4">
              <AiFillHeart color="red" fontSize="2em" />
            </Link>
            <Link to="/">
              <button className="btn btn-dark">Logout</button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        {favMemeArr.map((meme) => {
          return (
            <div
              key={meme.id}
              className="d-flex flex-row justify-content-center"
            >
              <div className="img-wrapper">
                <img src={meme.url} alt={meme.name} className="meme-img" />
                <div
                  type="button"
                  className="fav-wrapper"
                  onClick={() => handleDeleteFavMemes(meme)}
                >
                  <AiFillHeart color="red" fontSize="2em" />
                </div>
                <div className="meme-name slide-up">{meme.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavMemesPage;
