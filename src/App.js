import React, { Suspense, lazy } from "react";
import "./assets/scss/style.scss";
import "./assets/scss/styleLoginRegist.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

const LandingPage = lazy(() => import("./pages/Landingpage"));
const Login = lazy(() => import("./pages/Login"));
const Regist = lazy(() => import("./pages/Regist"));
const List = lazy(() => import("./pages/List"));
const Detail = lazy(() => import("./pages/Detail"));
const EventRegist = lazy(() => import("./pages/EventRegist"));
const SearchFriends = lazy(() => import("./pages/SearchFriends"));
const Chats = lazy(() => import("./pages/Chats"));
const Loading = lazy(() => import("./pages/Loading"));
const PersonalChat = lazy(() => import("./pages/PersonalChat"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));

// import LandingPage from "./pages/Landingpage";
// import Login from "./pages/Login";
// import Regist from "./pages/Regist";
// import List from "./pages/List";
// import Detail from "./pages/Detail";
// import EventRegist from "./pages/EventRegist";
// import SearchFriends from "./pages/SearchFriends";
// import Chats from "./pages/Chats";
// import Loading from "./pages/Loading";
// import PersonalChat from "./pages/PersonalChat";
// import ForgetPassword from "./pages/ForgetPassword";

function App() {
  const socket = io.connect("http://localhost:3001");

  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<LandingPage />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/regist" element={<Regist />}></Route>
            <Route exact path="/forget" element={<ForgetPassword />}></Route>
            <Route exact path="/search" element={<List />}></Route>
            <Route exact path="/detail/:id" element={<Detail />}></Route>
            <Route exact path="/chat" element={<PersonalChat socket={socket} />}></Route>
            <Route exact path="/addevent" element={<EventRegist />}></Route>
            <Route exact path="/find" element={<SearchFriends />}></Route>
            <Route exact path="/waiting" element={<Loading socket={socket} />}></Route>
            <Route exact path="/live/:idroom" element={<Chats socket={socket} />}></Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
