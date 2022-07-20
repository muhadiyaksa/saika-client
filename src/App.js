import React from "react";
import "./assets/scss/style.scss";
import "./assets/scss/styleLoginRegist.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import Login from "./pages/Login";
import Regist from "./pages/Regist";
import List from "./pages/List";
import Detail from "./pages/Detail";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/regist" element={<Regist />}></Route>
          <Route exact path="/search" element={<List />}></Route>
          <Route exact path="/detail/:id" element={<Detail />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
