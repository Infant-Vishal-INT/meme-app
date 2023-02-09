import React from "react";
import { Routes, Route } from "react-router-dom";
import FavMemesPage from "../pages/FavMemesPage";
import LoginPage from "../pages/login";
import MemePage from "../pages/MemePage";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/memes" element={<MemePage />} />
        <Route path="/fav_memes" element={<FavMemesPage />} />
      </Routes>
    </>
  );
};

export default MainRouter;
