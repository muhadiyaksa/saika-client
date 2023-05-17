import React, { Suspense, lazy } from "react";
import "./assets/scss/style.scss";
import "./assets/scss/styleLoginRegist.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import LoadingElement from "./parts/LoadingElement";

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

function App() {
  const socket = io.connect("http://localhost:3001");

  return (
    <>
      <Router>
        <Suspense fallback={<LoadingElement />}>
          <Routes>
            <Route exact path="/" element={<LandingPage socket={socket} />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/regist" element={<Regist />}></Route>
            <Route exact path="/forget" element={<ForgetPassword />}></Route>
            <Route exact path="/search" element={<List socket={socket} />}></Route>
            <Route exact path="/detail/:id" element={<Detail socket={socket} />}></Route>
            <Route exact path="/chat" element={<PersonalChat socket={socket} />}></Route>
            <Route exact path="/addevent" element={<EventRegist socket={socket} />}></Route>
            <Route exact path="/find" element={<SearchFriends socket={socket} />}></Route>
            <Route exact path="/waiting" element={<Loading socket={socket} />}></Route>
            <Route exact path="/live/:idroom" element={<Chats socket={socket} />}></Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
