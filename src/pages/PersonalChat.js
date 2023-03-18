import React, { useState, useEffect } from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import Button from "../element/Button";
import Axios from "axios";
import { useSelector } from "react-redux";
import ModalElement from "../element/ModalElement";
import { Navigate } from "react-router-dom";
import { returnFormatDate } from "../utils/numberFormat";
import ChatElement from "../parts/ChatElement";
import LoadingElement from "../parts/LoadingElement";

export default function PersonalChat({ socket }) {
  const userObj = JSON.parse(localStorage.getItem("userSaika"));
  const userData = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [dataUser, setDataUser] = useState(false);
  const [dataChat, setDataChat] = useState({});
  const [dataChatLoading, setDataChatLoading] = useState([]);
  const [dataFriend, setDataFriend] = useState({});
  const [dataChatAll, setDataChatAll] = useState([]);
  const [dataWaitingFriend, setDataWaitingFriend] = useState([]);

  const [geser, setGeser] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isFriendProfile, setIsFriendProfile] = useState(false);
  const [pesanKirim, setPesanKirim] = useState("");

  const [showList, setShowList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalTolak, setShowModalTolak] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);

  const [spinnerTerima, setSpinnerTerima] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModalTolak = () => {
    setShowModalTolak(true);
  };
  const handleCloseModalTolak = () => {
    setShowModalTolak(false);
  };
  const handleCloseModalInfo = () => {
    setShowModalInfo(false);
  };

  useEffect(() => {
    const getDataUser = () => {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3001/user/${userData._id}`,
        headers: {
          Authorization: `Bearer ${userObj.token}`,
        },
      }).then((result) => {
        setDataUser(result.data);
        socket.emit("data_user", userData._id);
        setPesanKirim("");
      });
    };
    getDataUser();

    const getDataAllChat = () => {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3001/chat/allv2/${userData._id}`,
        headers: {
          Authorization: `Bearer ${userObj.token}`,
        },
      }).then((res) => {
        console.log(res.data);
        setDataChatAll(res.data);
      });
    };
    getDataAllChat();
  }, []);

  useEffect(() => {
    socket.on("pesan_terima_pc", (data) => {
      setDataChatLoading([]);
      if (data._id === localStorage.getItem("idchatUserSaika")) {
        setDataChat(data);
      }
      console.log("Pesan Terima Socket Is Active");
      setIsLoadingButton(false);
    });

    socket.on("pesan_aktif", (data) => {
      setDataChatAll(data);
    });

    return () => {
      socket.off("pesan_terima_pc");
      socket.off("pesan_aktif");
    };
  }, []);

  const showChatsV2 = (e) => {
    setGeser(true);
    setIsChat(true);
    setIsLoading(true);
    setPesanKirim("");
    localStorage.removeItem("idchatUserSaika");

    // Menampilkan Header Profil Chat dengan Data Terbaru
    Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3001/user/friend/${e.target.getAttribute("iduserreq")}`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    }).then((res) => {
      console.log(res.data);
      setDataFriend(res.data);
    });

    // Menampilkan Data Chat
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        iduserreceive: e.target.getAttribute("iduserreq"),
        idchat: e.target.getAttribute("idchat"),
      },
      url: `http://localhost:3001/chat/room/${userData._id}`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    }).then((res) => {
      localStorage.setItem("idchatUserSaika", res.data._id);
      setDataChat(res.data);
      setIsFriendProfile(false);

      let tungguData = new Promise((fulfill, reject) => {
        if (dataChat) {
          return fulfill(dataChat);
        }
      });
      tungguData.then(() => {
        setIsLoading(false);
      });
    });
  };

  const hiddenChats = () => {
    setGeser(false);
  };
  // console.log(dataFriend);
  const sendMessage = () => {
    // setIsLoadingButton(true);
    const formatDate = returnFormatDate();

    const dataKirim = {
      idchat: dataChat._id,
      iduser: userData._id,
      idfriend: dataFriend.iduser,
      pesanKirim: pesanKirim,
    };

    let pesanMasuk = {
      _id: null,
      iduser: userData._id,
      pesan: pesanKirim,
      tanggal: formatDate.tanggalKirim,
    };

    let chatsArray = [pesanMasuk, ...dataChatLoading];
    setDataChatLoading(chatsArray);

    socket.emit("send_message_pc", dataKirim);
    socket.emit("active_or_close_message", dataKirim);

    const inputPesan = document.querySelector(".personalchat .input-chats .input-pesan");
    inputPesan.value = "";
  };

  const showProfil = (e) => {
    setGeser(true);
    setIsLoading(true);

    Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3001/user/friend/${e.target.getAttribute("iduserreq")}`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    }).then((res) => {
      setIsChat(true);
      setIsFriendProfile(true);
      setDataFriend(res.data);
      setIsLoading(false);
    });
  };

  const deleteFriend = () => {
    console.log("hai");
  };

  const handleTerima = () => {
    setSpinnerTerima(true);

    //Buat AXIOS terima
    setTimeout(() => {
      setSpinnerTerima(false);
      setShowModalInfo(true);
    }, 3000);
  };

  const showListFriendsAndChatV2 = () => {
    setShowList(false);

    Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3001/user/waitingfriend/${userData._id}`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    })
      .then((res) => {
        setDataChatAll(res.data);
      })
      .catch((err) => {
        setDataChatAll([]);
      });
  };

  const showListWaitingFriendsV2 = () => {
    setShowList(true);

    Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3001/user/waitingfriend/${userData._id}`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    })
      .then((res) => {
        setDataWaitingFriend(res.data);
      })
      .catch((err) => {
        setDataWaitingFriend([]);
      });
  };
  const showHideListFriendsV2 = () => {
    const checkStatus = (iduser1, statusChat1, statusChat2) => {
      let result;
      if (iduser1 === userData._id) {
        result = statusChat1 === "active" ? "red" : "d-none";
      } else {
        result = statusChat2 === "active" ? "red" : "d-none";
      }
      return result;
    };

    if (showList === false) {
      if (dataChatAll.length > 0) {
        let data = dataChatAll.map((el, i) => {
          return (
            <div className="item-friends " key={`itemfriend${i}`}>
              <div className="hover d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <div className="image ">
                    <img src={el.fotoProfil === "" ? "/image/ava_user.jpg" : el.fotoProfil} alt="" />
                  </div>
                  <div className="friend">
                    <p className="p-0 m-0 text-capitalize">{el.nama}</p>
                    <button iduserreq={el.iduser} className="btn p-0 text-cream shadow-none" onClick={showProfil}>
                      @{el.username}
                    </button>
                  </div>
                </div>
                <div className="info">
                  <button className="btn p-0 shadow-none" iduserreq={el.iduser} idchat={!dataChat ? "null" : dataChat._id} onClick={showChatsV2}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-envelope-fill text-cream" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                    </svg>
                  </button>
                  <span className={`${!el.dataChat ? "d-none" : checkStatus(el.dataChat.iduserpertama, el.dataChat.statusChatUserPertama, el.dataChat.statusChatUserKedua)}`}></span>
                </div>
              </div>
            </div>
          );
        });
        return data;
      } else {
        return (
          <div className="pt-5 d-flex align-items-center justify-content-center">
            <p className="ketnull">Kamu belum Memiliki Teman</p>
          </div>
        );
      }
    } else {
      if (dataWaitingFriend.length > 0) {
        let data = dataWaitingFriend.map((el, i) => {
          return (
            <div className="item-friends d-flex align-items-center" key={`datawaitingfriend${i}`}>
              <div className="d-flex align-items-center">
                <div className="image me-lg-3 me-1">
                  <img src={el.fotoProfil === "" ? "/image/ava_user.jpg" : el.fotoProfil} alt="" />
                </div>
                <div className="friend">
                  <p className="p-0 m-0">{el.nama}</p>
                  <button iduserreq={el.iduser} className="btn p-0 shadow-none" onClick={showProfil}>
                    {el.username}
                  </button>
                </div>
              </div>
              <div className="action">
                <button className="btn tolak d-sm-none d-lg-inline-block shadow-none" iduserreq={el.iduser} onClick={handleShowModalTolak}>
                  tolak
                </button>
                <button className="btn terima d-sm-none d-lg-inline-block shadow-none px-2" iduserreq={el.iduser} onClick={handleTerima}>
                  Terima
                  {spinnerTerima ? (
                    <div className="lds-ring d-inline-props">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    ""
                  )}
                </button>
                <button className="btn p-0 d-none d-sm-inline-block d-lg-none shadow-none" iduserreq={el.iduser} onClick={handleShowModalTolak}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-check-circle-fill text-cyan" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </button>
                <button className="btn p-0 d-none d-sm-inline-block d-lg-none shadow-none" iduserreq={el.iduser}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        });
        return data;
      } else {
        return (
          <div className="pt-5 d-flex align-items-center justify-content-center ">
            <p className="ketnull text-center">Kamu belum Memiliki Permintaan Pertemanan</p>
          </div>
        );
      }
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <section className="personalchat">
            <Header socket={socket} />
            <div className="container">
              <div className={`friends ${geser === true ? "geser" : ""}`}>
                <div className="navigasi-friends">
                  <button className={`btn shadow-none ${showList === false ? "active" : ""}`} onClick={showListFriendsAndChatV2}>
                    Teman Saya
                  </button>
                  <button className={`btn shadow-none ${showList === true ? "active" : ""}`} onClick={showListWaitingFriendsV2}>
                    Permintaan Teman
                  </button>
                </div>
                <div className="list-friends">{showHideListFriendsV2()}</div>
              </div>
              <div className="box">
                {isChat === false ? (
                  <div className="d-flex align-items-center justify-content-center banner flex-column">
                    <div className="image">
                      <img src="/image/chat-start.svg" alt="" />
                    </div>
                    <p>Mulailah Berkomunikasi secara Personal kepada teman-teman Mu di SAIKA</p>
                    <Button isPrimary type="link" href="/find" className="text-decoration-none">
                      Cari Teman
                    </Button>
                  </div>
                ) : (
                  <>
                    {isLoading === true ? (
                      <div className="position-relative h-100">
                        <LoadingElement />
                      </div>
                    ) : (
                      <>
                        {isFriendProfile === true ? (
                          <div className="position-relative h-100">
                            <div className="profile-friend ">
                              <div className="subjudul mt-3 text-sm-center text-start d-flex align-items-center d-sm-block align-items-center mb-3 ">
                                <button className="btn p-0 me-3 d-sm-none ms-2" onClick={hiddenChats}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-circle text-cream" viewBox="0 0 16 16">
                                    <path
                                      fillRule="evenodd"
                                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                                    />
                                  </svg>
                                </button>
                                <p className="mb-0 mt-md-3">Profile Anggota SAIKA</p>
                              </div>

                              <div className="row justify-content-center align-items-center mb-3">
                                <div className="col-md mb-3">
                                  <div className="image user ">
                                    <img src={dataFriend?.fotoProfil === "" ? "/image/ava_user.jpg" : dataFriend?.fotoProfil} alt="Icon Process" />
                                  </div>
                                </div>
                                <div className="col-md text-center text-md-start ">
                                  <p className="fs-5 fw-bold text-cream">{dataFriend.jumlahTeman} Teman</p>
                                  <p className="text-capitalize mb-0 ">{dataFriend?.nama}</p>
                                  <p className="mb-0">@{dataFriend?.username}</p>
                                  <p>{dataFriend?.email}</p>
                                  <div className="d-flex justify-content-center justify-content-md-start">
                                    <button className="btn btn-cream btn-close-layer" idchat="null" iduserreq={dataFriend.iduser} onClick={showChatsV2} style={{ fontSize: "14px" }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-send text-dongker me-3" viewBox="0 0 16 16">
                                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                      </svg>
                                      <span>Kirim Pesan</span>
                                    </button>
                                    <button className="btn ms-2 btn-secondary " onClick={handleShowModal}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="position-relative h-100">
                            <div className="row header-chats align-items-center ">
                              <div className="col d-flex align-items-center">
                                <button className="btn p-0 me-3 d-sm-none" onClick={hiddenChats}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-circle text-cyan" viewBox="0 0 16 16">
                                    <path
                                      fillRule="evenodd"
                                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                                    />
                                  </svg>
                                </button>
                                <div className="image">
                                  <img src={dataFriend?.fotoProfil === "" ? "/image/ava_user.jpg" : dataFriend?.fotoProfil} alt="" />
                                </div>
                                <div className="identitas">
                                  {/* <p className="p-0 m-0 text-capitalize">{dataChat?.iduserpertama === userData._id ? dataChat.userkedua.nama : dataChat.userpertama.nama}</p> */}
                                  <p className="p-0 m-0 text-capitalize">{dataFriend?.nama}</p>
                                  {/* <span>@{dataChat?.iduserpertama === userData._id ? dataChat.userkedua.username : dataChat.userpertama.username}</span> */}
                                  <span>@{dataFriend?.username}</span>
                                </div>
                              </div>
                            </div>
                            <div className="list-chats">
                              <div className="position-relative h-100 w-100 ">
                                <div className="chat-value ">
                                  {/* {tampilPesan()} */}
                                  <ChatElement dataChatLoading={dataChatLoading} dataChat={dataChat} userData={userData} typeChat={"personal"} />
                                </div>
                              </div>
                            </div>
                            <div className="input-chats">
                              <div className="position-relative h-100">
                                <textarea className="form-control input-pesan shadow-none border-0" placeholder="ketikan pesanmu disini" onChange={(e) => setPesanKirim(e.target.value)} />
                                {/* PR BIKIN TOMBOL BUTTON ADA LOADINGNYA */}
                                <Button isLoading={false} className="btn shadow-none text-cream" onClick={sendMessage}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="23"
                                    height="23"
                                    fill="currentColor"
                                    className={`bi bi-send-fill text-cream ${isLoadingButton ? "d-none" : ""}`}
                                    viewBox="0 0 16 16"
                                    style={{ transform: "rotate(45deg)" }}
                                  >
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                  </svg>
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
          <div className="d-none d-sm-block">
            <Footer />
          </div>
          <ModalElement show={showModal} funcModal={handleCloseModal} isDongker heading={"Konfirmasi"}>
            <div className="text-center py-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-exclamation-circle text-danger" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
              <p className="w-75 mx-auto mt-3 mb-3">Apakah Kamu Yakin Untuk menghapus Pertemanan ini?</p>
              <Button className="py-2 px-3 rounded-pill fs-6 btn btn-danger mb-4" onClick={deleteFriend}>
                Ya, Saya Yakin
              </Button>
            </div>
          </ModalElement>
          <ModalElement show={showModalTolak} funcModal={handleCloseModalTolak} isDongker heading={"Konfirmasi"}>
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-exclamation-circle text-danger" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
              <p className="w-75 mx-auto mt-3 ">Apakah Kamu Yakin Untuk menghapus Pertemanan ini?</p>
              <Button className="py-2 px-3 rounded-pill fs-6 btn btn-danger mb-4 " onClick={deleteFriend}>
                Ya, Saya Yakin
              </Button>
            </div>
          </ModalElement>
          <ModalElement isHeader={false} isCentered={true} show={showModalInfo} funcModal={handleCloseModalInfo} heading={"Profil"}>
            <div className="d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-exclamation-circle me-3 text-success" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
              <span>Yeay, Sahabat Informatikamu bertambah satu</span>
            </div>
          </ModalElement>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
