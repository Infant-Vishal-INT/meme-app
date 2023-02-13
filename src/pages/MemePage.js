import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFavMeme, deleteFavMeme } from "../redux/actions";
import NavbarComponent from "../utils/Navbar";
import SearchBar from "../utils/SearchBar";
import MemeModal from "../utils/MemeModal";
import "../assets/css/memePage.css";

const MemePage = () => {
  const dispatch = useDispatch();
  const favMemeArr = useSelector((state) => state.favMemeReducer.favMemeArr);

  const [memeData, setMemeData] = useState([]);
  const [filteredMemeData, setFilteredMemeData] = useState([]);
  const [detailedMeme, setDetailedMeme] = useState({});
  const [isDetailedModalOpen, setIsDetailedModalOpen] = useState(false);
  const [isFavButtonClicked, setIsFavButtonClicked] = useState(false);
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
  const handleFavMemes = (e, meme) => {
    e.preventDefault();
    setIsFavButtonClicked(true);
    setIsDetailedModalOpen(false);
    if (favMemeArr.some((element) => element.id == meme.id)) {
      dispatch(deleteFavMeme(meme));
    } else {
      dispatch(addFavMeme(meme));
    }
  };

  // const handleDetailedPage = (meme) => {
  //   if (isFavButtonClicked == false) {
  //     setDetailedMeme(meme);
  //     setIsDetailedModalOpen(true);
  //   }
  // };

  const handleDetailedPage = (e, meme) => {
    if (e.target.nodeName === "IMG") {
      setDetailedMeme(meme);
      setIsDetailedModalOpen(true);
    } else {
      setIsDetailedModalOpen(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getMemeData();
  }, []);

  const outputData = () => {
    if (filteredMemeData.length == 0) {
      return memeData;
    } else {
      return filteredMemeData;
    }
  };

  console.log("isDetailedModalOpen ==>", isDetailedModalOpen);
  console.log("isFav butn clicked", isFavButtonClicked);

  return (
    <div className="meme-page-bg">
      <NavbarComponent />
      <SearchBar
        memeData={memeData}
        setFilteredMemeData={setFilteredMemeData}
      />
      <div>
        {loading ? <div>Loading...</div> : null}

        {outputData().map((meme) => {
          return (
            <div
              key={meme.id}
              className="d-flex flex-row justify-content-center"
              onClick={(e) => handleDetailedPage(e, meme)}
            >
              <div className="img-wrapper">
                <img src={meme.url} alt={meme.name} className="meme-img" />
                <div
                  type="button"
                  className="fav-wrapper"
                  onClick={(e) => handleFavMemes(e, meme)}
                >
                  {favMemeArr.some((element) => element.id == meme.id) ? (
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
      {isDetailedModalOpen ? (
        <MemeModal
          detailedMeme={detailedMeme}
          isDetailedModalOpen={isDetailedModalOpen}
          isFavButtonClicked={isFavButtonClicked}
          setIsDetailedModalOpen={setIsDetailedModalOpen}
        />
      ) : null}
    </div>
  );
};

export default MemePage;
