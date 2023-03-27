import React, { useState, useEffect, useRef } from "react";
import Button from "../element/Button";
import IconNotif from "../assets/icon/notif.png";
import avaUser from "../assets/icon/ava_user.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getDataUser, logout } from "../features/user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import ModalElement from "../element/ModalElement";

export default function Header({ socket }) {
  // const socket = io("http://localhost:3001", {
  //   transports: ["websocket"],
  //   withCredentials: true,
  // });

  const userObj = JSON.parse(localStorage.getItem("userSaika"));
  const userObj2 = JSON.parse(localStorage.getItem("userLogin"));
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userData = useSelector((state) => state.user.user);

  const [dataUser, setDataUser] = useState({});
  const [dataChatAll, setDataChatAll] = useState([]);
  const [dataPassword, setDataPassword] = useState({});
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchtoAPI();

    const getDataAllChat = (iduser) => {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3001/chat/allv2/${iduser}`,
        headers: {
          Authorization: `Bearer ${userObj.token}`,
        },
      })
        .then((res) => {
          let dataFilter = res.data.filter((el) => {
            if (checkStatus(el.dataChat.iduserpertama, el.dataChat.statusChatUserPertama, el.dataChat.statusChatUserKedua) === "red") {
              return el;
            }
          });
          setDataChatAll(dataFilter);
        })
        .catch((error) => {
          setDataChatAll([]);
        });
    };
    if (isLoggedIn) {
      const dataIDUser = new Promise((fulfill, reject) => {
        if (userData._id) {
          return fulfill(userData._id);
        }
      });
      dataIDUser.then((res) => {
        getDataAllChat(res);
      });
    }
  }, []);

  useEffect(() => {
    socket.on("pesan_aktif", (data) => {
      let dataFilter = data.filter((el) => {
        if (checkStatus(el.dataChat.iduserpertama, el.dataChat.statusChatUserPertama, el.dataChat.statusChatUserKedua) === "red") {
          return el;
        }
      });
      setDataChatAll(dataFilter);
    });
  }, []);

  const handleLogout = () => {
    setSpinnerLogout(true);
    dispatch(logout());
    window.location.reload();
  };

  const fetchtoAPI = async () => {
    if (isLoggedIn) {
      setIsLoadingPage(true);
      const dataIDUser = new Promise((fulfill, reject) => {
        if (userData._id) {
          return fulfill(userData._id);
        }
      });

      dataIDUser.then(async (res) => {
        const actionResult = await dispatch(getDataUser(res));
        const result = unwrapResult(actionResult);
        setDataUser(result);
        setIsLoadingPage(false);
      });
    }
  };
  const [foto, setFoto] = useState({});
  const [uploadFile, setUploadFile] = useState(false);
  const [fotoError, setFotoError] = useState(false);

  function setFile(event) {
    let validExtensions = ["image/jpg", "image/jpeg", "image/png"];
    let file = event.target.files[0];
    if (validExtensions.includes(file.type) && file.size <= 2000000) {
      setFoto(file);
      setUploadFile(true);
      setFotoError(false);
      let reader = new FileReader();
      reader.onload = (e) => {
        document.querySelector(".image-profile .image img").src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      setUploadFile(false);
      setFotoError(true);
    }
  }

  const updateProfil = () => {
    setSpinnerProfil(true);
    let data = new FormData();
    data.append("iduserreq", userData._id);
    data.append("nama", dataUser?.nama);
    data.append("username", dataUser?.username);
    data.append("file", foto);
    data.append("uploadFile", uploadFile);
    Axios({
      method: "PUT",
      withCredentials: true,
      data: data,
      url: `http://localhost:3001/user/profil`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    }).then((res) => {
      if (res.data.message === "success") {
        fetchtoAPI();
        setSpinnerProfil(false);
        setShow(false);
        setShowModalInfo(true);
        setUploadFile(false);
      }
    });
  };

  const updatePassword = () => {
    setSpinnerPassword(true);
    Axios({
      method: "PUT",
      withCredentials: true,
      data: {
        iduserreq: userData._id,
        passwordOld: dataPassword.passwordOld ? dataPassword.passwordOld : "",
        passwordNew: dataPassword.passwordNew,
        passwordConfirm: dataPassword.passwordConfirm,
      },
      url: `http://localhost:3001/user/password`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    }).then((res) => {
      if (!res.data.errors) {
        setSpinnerPassword(false);
        setShowModalPassword(false);
        setShowModalInfo(true);
        setErrors([]);
      } else {
        setSpinnerPassword(false);
        let error = res.data.errors.map((el) => el.msg);
        setErrors(error);
      }
    });
  };

  const [show, setShow] = useState(false);
  const handleCloseNotif = () => setShow(false);
  const handleShowNotif = () => {
    setShow(true);
    setShowModalProfile(false);
  };

  const [showModalPassword, setShowModalPassword] = useState(false);
  const handleCloseNotif2 = () => {
    setShowModalPassword(false);
    setErrors([]);
    setDataPassword({});
  };
  const handleShowNotif2 = () => {
    setShowModalPassword(true);
    setShowModalProfile(false);
  };

  const [showModalProfile, setShowModalProfile] = useState(false);
  const handleCloseModalProfile = () => setShowModalProfile(false);
  const handleShowModalProfile = () => setShowModalProfile(true);

  const [showModalInfo, setShowModalInfo] = useState(false);
  const handleCloseModalInfo = () => setShowModalInfo(false);

  const [showModalLogout, setShowModalLogout] = useState(false);
  const handleCloseModalLogout = () => setShowModalLogout(false);
  const handleShowModalLogout = () => {
    setShowModalLogout(true);
    setShowModalProfile(false);
  };

  const [showModalNotif, setShowModalNotif] = useState(false);
  const handleShowModalNotif = () => setShowModalNotif(true);
  const handleCloseModalNotif = () => setShowModalNotif(false);

  const [spinnerProfil, setSpinnerProfil] = useState(false);
  const [spinnerPassword, setSpinnerPassword] = useState(false);
  const [spinnerLogout, setSpinnerLogout] = useState(false);

  let refInputFile = useRef(null);
  const getNavLinkClass = (path) => {
    let location = `/${window.location.pathname.split("/")[1]}`;
    if (Array.isArray(path)) {
      if (path.includes(location)) {
        return "active";
      } else {
        return "";
      }
    } else {
      if (location === path) {
        return " active";
      } else {
        return "";
      }
    }
  };

  const subJudulHeader = () => {
    if (window.location.pathname === "/find") {
      return "Ruang Diskusi";
    } else if (window.location.pathname === "/search") {
      return "Ruang Acara";
    } else if (window.location.pathname === "/chat") {
      return "Ruang Sahabat";
    } else {
      return "Ruang Informatika";
    }
  };

  const checkStatus = (iduser1, statusChat1, statusChat2) => {
    let result;
    if (iduser1 === userData._id) {
      result = statusChat1 === "active" ? "red" : "d-none";
    } else {
      result = statusChat2 === "active" ? "red" : "d-none";
    }
    return result;
  };

  const showNotif = () => {
    if (dataChatAll?.length > 0) {
      let data = dataChatAll.map((el, i) => {
        return (
          <a
            className={`btn btn-close-layer  d-flex shadow-none text-start mb-1  w-100 align-items-center  ${el.iduser === el.dataChat.iduserpertama ? el.dataChat.statusNotifUserKedua : el.dataChat.statusNotifUserPertama}`}
            key={`notif-${i}`}
            href="/chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-envelope-fill text-cream me-3" viewBox="0 0 16 16">
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
            </svg>

            <p className={"text-cream"}>
              Pesan baru dari <strong>@{el.username}</strong>
            </p>
            <span className="red "></span>
          </a>
        );
      });

      return data;
    } else {
      return (
        <div className="text-center p-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-mailbox text-cream mb-2" viewBox="0 0 16 16">
            <path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />
            <path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />
          </svg>
          <p className="text-softwhite">Kamu belum memiliki notifikasi apapun</p>
        </div>
      );
    }
  };

  const showUser = () => {
    if (isLoggedIn) {
      return (
        <>
          <Button className="btn border rounded-circle p-0 d-none d-sm-block  shadow-none">
            <img src={dataUser.fotoUser ? `${dataUser.fotoUser.fotoUrl === "" ? avaUser : dataUser.fotoUser.fotoUrl}` : `${avaUser}`} alt="User" />
          </Button>
          <div className="hover-item  text-start ">
            <ul className="list-group ">
              <li className="list-group-item d-flex align-items-center ">
                <div className="image d-sm-none">
                  <img src={dataUser.fotoUser ? `${dataUser.fotoUser.fotoUrl === "" ? avaUser : dataUser.fotoUser.fotoUrl}` : `${avaUser}`} alt="User" />
                </div>
                <div>
                  {isLoadingPage === true ? (
                    <div>Loading ...</div>
                  ) : (
                    <>
                      <p className="fw-bold text-nowrap text-capitalize">{dataUser.nama}</p>
                      <span>{dataUser.email}</span>
                    </>
                  )}
                </div>
              </li>
              <li className="list-group-item">
                <Button className="btn d-inline-flex w-100 align-items-center shadow-none text-cream" onClick={handleShowNotif}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle me-2" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                  </svg>
                  <span>Ubah Profile</span>
                </Button>
                <Button className="btn d-inline-flex w-100 align-items-center shadow-none  text-cream" onClick={handleShowNotif2}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill me-2" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                  </svg>
                  <span>Ubah Password</span>
                </Button>
                <Button className="btn d-inline-flex w-100 align-items-center shadow-none logout btn-outline-danger border-0" onClick={handleShowModalLogout}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right me-2" viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                    />
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                  </svg>
                  <span>Logout</span>
                </Button>
              </li>
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <div className="d-flex align-items-center">
          <Button isPrimary className="py-1 px-2 me-3 text-decoration-none rounded d-inline-flex align-items-center" type="link" href="/login">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right me-2" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
              />
              <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
            </svg>
            Login
          </Button>
          <span className="text-softwhite d-sm-none">Kamu belum Terdaftar Sebagai Pengguna!</span>
        </div>
      );
    }
  };
  return (
    <nav className="navbar navbar-expand-sm">
      <div className="container">
        <Button type="link" className="navbar-brand text-md-center shadow-none " href="/">
          <span className="judul">SAIKA</span>
          <br />
          <span className="d-block d-md-none fw-light" style={{ fontSize: "11px" }}>
            {subJudulHeader()}
          </span>
          <span className="d-none d-md-block fw-light">Sahabat Informatika</span>
        </Button>
        <div className="navbar-account ms-auto d-sm-none  shadow-none">
          <Button className="position-relative btn p-0 shadow-none" onClick={handleShowModalNotif}>
            <img src={IconNotif} className="icon-notif" />
            {dataChatAll?.length > 0 ? <div className="notif"></div> : ""}
          </Button>
          <Button className="btn border ava-user rounded-circle p-0" onClick={handleShowModalProfile}>
            <img src={dataUser.fotoUser ? `${dataUser.fotoUser.fotoUrl === "" ? avaUser : dataUser.fotoUser.fotoUrl}` : `${avaUser}`} alt="User" />
          </Button>
        </div>

        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-lg-0 flex-sm-row  d-flex ">
            <li className="nav-item ">
              <Button type="link" className={`nav-link    shadow-none ${getNavLinkClass("/find")}`} aria-current="page" href="/find">
                Diskusi
              </Button>
            </li>
            <li className="nav-item">
              <Button type="link" className={`nav-link   shadow-none  ${getNavLinkClass("/search")}`} href="/search">
                Acara
              </Button>
            </li>
            <li className="nav-item">
              <Button type="link" className={`nav-link    shadow-none ${getNavLinkClass("/chat")}`} href="/chat">
                Teman
              </Button>
            </li>
          </ul>
          <div className="navbar-account ms-auto d-none d-sm-flex ">
            <div className="notification">
              <Button className="position-relative button-notif btn p-0 shadow-none">
                <img src={IconNotif} />
                {dataChatAll?.length > 0 ? <div className="notif"></div> : ""}
              </Button>
              <div className="area-notif ">
                <p className="text-center my-2 fw-bold text-softwhite">Notifikasi SAIKA</p>
                {showNotif()}
              </div>
            </div>

            <div className=" text-end user mx-xl-3 mx-lg-2 mx-md-1 mx-sm-3 mx-2 d-inline-block">{showUser()}</div>
          </div>
        </div>
        <div className="navbar-bottom d-sm-none">
          <Button className={`btn  shadow-none ${getNavLinkClass("/")}`} type="link" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
              <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
            </svg>
            <span>Beranda</span>
          </Button>
          <Button className={`btn  shadow-none ${getNavLinkClass("/find")}`} type="link" href="/find">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-chat-right-dots" viewBox="0 0 16 16">
              <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
              <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
            <span>Diskusi</span>
          </Button>
          <Button className={`btn  shadow-none  p-0 ${getNavLinkClass("/chat")}`} type="link" href="/chat">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
            <span>Teman</span>
          </Button>
          <Button className={`btn  shadow-none p-0 ${getNavLinkClass(["/search", "/addevent", "/detail"])}`} type="link" href="/search">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-calendar4-event " viewBox="0 0 16 16">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" />
              <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
            </svg>
            <span>Acara</span>
          </Button>
        </div>
      </div>
      <ModalElement isDongker={true} show={show} isCentered={true} funcModal={handleCloseNotif}>
        <div className="d-flex text-softwhite justify-content-between align-items-center shadow-none" onClick={handleCloseNotif}>
          <p>Ubah Profile</p>
          <button className="btn p-0 m-0 fw-bold text-cream">x</button>
        </div>
        <div className="image-profile ">
          <div className="image border border-2">
            <img src={dataUser.fotoUser ? `${dataUser.fotoUser.fotoUrl === "" ? avaUser : dataUser.fotoUser.fotoUrl}` : `${avaUser}`} alt="User" />
          </div>
          <input type="file" className="d-none" ref={refInputFile} onChange={setFile.bind(this)} />
          <Button isPrimary isDongker className="btn  shadow-none " onClick={() => refInputFile.current.click()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-camera-fill " viewBox="0 0 16 16">
              <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
            </svg>
          </Button>
        </div>
        <span className={` text-center text-danger ${fotoError ? "d-block" : "d-none"}`} style={{ fontSize: "11px" }}>
          * File harus berupa JPG/PNG/JPEG dan maksimal 2MB
        </span>

        <label htmlFor="username" className="text-dongker">
          Username
        </label>
        <input id="username" type="text" className="form-control shadow-none mb-3" placeholder="username" defaultValue={dataUser.username} onChange={(e) => setDataUser({ ...dataUser, username: e.target.value })} />
        <label htmlFor="name" className="text-dongker">
          Nama Lengkap
        </label>
        <input id="nama" type="text" className="form-control shadow-none mb-3" placeholder="Nama Lengkap" defaultValue={dataUser.nama} onChange={(e) => setDataUser({ ...dataUser, nama: e.target.value })} />
        <Button isPrimary className="mt-4 mx-auto  fs-6  shadow-none d-flex align-items-center justify-content-center" isSpinner={spinnerProfil} onClick={updateProfil}>
          Simpan
        </Button>
      </ModalElement>
      <ModalElement isDongker={true} show={showModalPassword} isCentered={true} funcModal={handleCloseNotif2}>
        <div className="d-flex  mb-3 justify-content-between align-items-center shadow-none" onClick={handleCloseNotif2}>
          <p className="text-softwhite">Ubah Password</p>
          <button className="btn p-0 m-0 fw-bold text-cream">x</button>
        </div>
        <label htmlFor="lama">Password Lama</label>
        <input id="lama" type="password" className="form-control shadow-none mb-3" placeholder="Isi Password lama" onChange={(e) => setDataPassword({ ...dataPassword, passwordOld: e.target.value })} />
        <label htmlFor="baru">Password Baru</label>
        <input id="baru" type="password" className="form-control shadow-none mb-3" placeholder="Isi Password Baru" onChange={(e) => setDataPassword({ ...dataPassword, passwordNew: e.target.value })} />
        <label htmlFor="konfirmbaru">Konfirmasi Password Baru</label>
        <input id="konfirmbaru" type="password" className="form-control shadow-none mb-3" placeholder="Isi Konfirmasi Password" onChange={(e) => setDataPassword({ ...dataPassword, passwordConfirm: e.target.value })} />
        <ul style={{ fontSize: "12px" }}>
          {errors?.map((el, i) => {
            return (
              <li className="text-danger" key={`msg-${i}`}>
                {el}
              </li>
            );
          })}
        </ul>
        <Button isPrimary className="w-100  fs-6  shadow-none d-inline-flex align-items-center justify-content-center" isSpinner={spinnerPassword} onClick={updatePassword}>
          Simpan
        </Button>
      </ModalElement>
      <ModalElement isDongker show={showModalProfile} isCentered={true} funcModal={handleCloseModalProfile}>
        {showUser()}
      </ModalElement>
      <ModalElement isDongker isHeader={false} isCentered={true} show={showModalInfo} funcModal={handleCloseModalInfo} heading={"Profil"}>
        <div className="d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-exclamation-circle me-3 text-success" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
          </svg>
          <span className="text-softwhite">Profil Berhasil di ubah</span>
        </div>
      </ModalElement>
      <ModalElement isDongker={true} isHeader={false} show={showModalLogout} funcModal={handleCloseModalLogout} heading={"Logout"} isCentered={false}>
        <div className="text-center d-flex flex-column align-items-center py-4 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" className="bi bi-exclamation-triangle text-danger" viewBox="0 0 16 16">
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
          </svg>
          <span className="mt-3 mb-4 text-softwhite">Apakah Anda Yakin Untuk Logout?</span>
          <div className="d-flex">
            <Button className="btn btn-light border rounded-pill me-3  shadow-none" onClick={handleCloseModalLogout}>
              Batal
            </Button>
            <Button className="btn btn-danger rounded-pill  shadow-none d-flex align-items-center" isSpinner={spinnerLogout} onClick={handleLogout}>
              Ya, Logout
            </Button>
          </div>
        </div>
      </ModalElement>
      <ModalElement isDongker isHeader={false} show={showModalNotif} funcModal={handleCloseModalNotif} isCentered={true}>
        <div className="area-notif ">
          <div className="d-flex justify-content-between align-items-center">
            <p className="text-center my-2 fw-bold text-softwhite mobile">Notifikasi SAIKA</p>
            <Button className="btn fw-bold shadow-none text-cream" onClick={handleCloseModalNotif}>
              X
            </Button>
          </div>
          {showNotif()}
        </div>
      </ModalElement>
    </nav>
  );
}
