import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavMeme } from "../redux/actions";
import NavbarComponent from "../components/Navbar";
import "../assets/css/memePage.css";

const FavMemesPage = () => {
  const dispatch = useDispatch();
  const favMemeArr = useSelector((state) => state.favMemeReducer.favMemeArr);

  console.log("fav meme arr from fav meme page ==>", favMemeArr);

  const handleDeleteFavMemes = (meme) => {
    const index = favMemeArr.indexOf(meme);
    dispatch(deleteFavMeme(meme));
  };

  return (
    <div className="meme-page-bg">
      <NavbarComponent />

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
