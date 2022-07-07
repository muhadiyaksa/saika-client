import React from "react";
import "./assets/scss/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landingpage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
