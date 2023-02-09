import React from "react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login";
import MainRouter from "./routes/MainRouter";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
