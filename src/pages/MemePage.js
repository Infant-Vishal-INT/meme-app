import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavMeme,
  clearPersistedData,
  deleteFavMeme,
} from "../redux/actions";
import "../assets/css/navbar.css";
import "../assets/css/memePage.css";

const MemePage = () => {
  const dispatch = useDispatch();
  const favMemeArr = useSelector((state) => state.favMemeReducer.favMemeArr);

  const [memeData, setMemeData] = useState([]);
  const [filteredMemeData, setFilteredMemeData] = useState([]);
  const [searchInputVal, setSearchInputVal] = useState("");
  const [loading, setLoading] = useState();

  const getMemeData = async () => {
    await axios
      .get(" https://api.imgflip.com/get_memes")
      .then((response) => {
        setLoading(false);
        setMemeData(response.data.data.memes);
      })
      .catch((err) => console.error("Err", err));
  };

  const handleSearch = () => {
    setFilteredMemeData(
      memeData.filter((meme) =>
        meme.name.toLowerCase().includes(searchInputVal.toLowerCase())
      )
    );
  };

  const handleFavMemes = (meme) => {
    if (favMemeArr.includes(meme)) {
      const index = favMemeArr.indexOf(meme);
      dispatch(deleteFavMeme(index));
    } else {
      dispatch(addFavMeme(meme));
    }
  };
  console.log("fav meme array ==>", favMemeArr);

  useEffect(() => {
    setLoading(true);
    getMemeData();
  }, []);

  console.log("filtered meme data", filteredMemeData);

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
          onChange={(e) => setSearchInputVal(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div>
        {loading ? <div>Loading...</div> : null}

        {filteredMemeData.length == 0
          ? memeData.map((meme) => {
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
                      onClick={() => handleFavMemes(meme)}
                    >
                      {favMemeArr.includes(meme) ? (
                        <AiFillHeart color="red" fontSize="2em" />
                      ) : (
                        <AiOutlineHeart color="white" fontSize="2em" />
                      )}
                    </div>
                    <div className="meme-name slide-up">{meme.name}</div>
                  </div>
                </div>
              );
            })
          : filteredMemeData.map((meme) => {
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
                      onClick={() => handleFavMemes(meme)}
                    >
                      {favMemeArr.includes(meme) ? (
                        <AiFillHeart color="red" fontSize="2em" />
                      ) : (
                        <AiOutlineHeart color="white" fontSize="2em" />
                      )}
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

export default MemePage;
