import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFavMeme, deleteFavMeme } from "../redux/actions";
import "../assets/css/memePage.css";
import NavbarComponent from "../utils/Navbar";
import SearchBar from "../utils/SearchBar";

const MemePage = () => {
  const dispatch = useDispatch();
  const favMemeArr = useSelector((state) => state.favMemeReducer.favMemeArr);
  const [memeData, setMemeData] = useState([]);
  const [filteredMemeData, setFilteredMemeData] = useState([]);
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

  const handleFavMemes = (meme) => {
    if (favMemeArr.includes(meme)) {
      const index = favMemeArr.indexOf(meme);
      dispatch(deleteFavMeme(index));
    } else {
      dispatch(addFavMeme(meme));
    }
  };

  useEffect(() => {
    setLoading(true);
    getMemeData();
  }, []);

  return (
    <div className="meme-page-bg">
      <NavbarComponent />
      <SearchBar
        memeData={memeData}
        setFilteredMemeData={setFilteredMemeData}
      />
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
