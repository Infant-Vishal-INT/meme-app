import React, { useState } from "react";

const SearchBar = ({ memeData, setFilteredMemeData }) => {
  const [searchInputVal, setSearchInputVal] = useState("");

  const handleSearch = () => {
    setFilteredMemeData(
      memeData.filter((meme) =>
        meme.name.toLowerCase().includes(searchInputVal.toLowerCase())
      )
    );
  };
  return (
    <div>
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
    </div>
  );
};

export default SearchBar;
