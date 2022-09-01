import React, { useState, useEffect } from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import Button from "../element/Button";
import ChatSend from "../assets/icon/send.png";
import Message from "../assets/image/message.png";
import Axios from "axios";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import IconProcess from "../assets/image/process2.png";
import ImageHello from "../assets/image/hello.png";
import ModalElement from "../element/ModalElement";

export default function PersonalChat() {
  const socket = io.connect("http://localhost:3001");
  const userObj = JSON.parse(localStorage.getItem("userSaika"));
  const userData = useSelector((state) => state.user.user);
  const [dataChat, setDataChat] = useState({});
  const [dataFriend, setDataFriend] = useState({});
  const [geser, setGeser] = useState(false);
  const [dataUser, setDataUser] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFriendProfile, setIsFriendProfile] = useState(false);
  const [pesanKirim, setPesanKirim] = useState("");
  const [activeChat, setActiveChat] = useState([]);

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
    setShowModal(true);
  };
  const handleCloseModalTolak = () => {
    setShowModal(false);
  };
  const handleCloseModalInfo = () => {
    setShowModalInfo(false);
  };
  // const actionResult = await dispatch(getDataUser(userData._id));
  // const result = unwrapResult(actionResult);
  // console.log(result);
  // setDataUser(result);
  // socket.emit("data_user", userData._id);
  // setPesanKirim("");
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
        url: `http://localhost:3001/chat/all/${userData._id}`,
        headers: {
          Authorization: `Bearer ${userObj.token}`,
        },
      }).then((res) => {
        console.log(res.data);
        setActiveChat(res.data);
      });
    };
    getDataAllChat();
  }, []);

  useEffect(() => {
    socket.on("pesan_terima_pc", (data) => {
      setDataChat(data);
    });

    socket.on("pesan_aktif", (data) => {
      console.log(data);
      setActiveChat(data);
    });
  }, [socket]);

  const showChats = (e) => {
    setGeser(true);
    setIsLoading(true);
    setPesanKirim("");

    //jalankan axios pang gil dataChat
    if (e.target.getAttribute("idchat") !== "null") {
      Axios({
        method: "PUT",
        withCredentials: true,
        url: `http://localhost:3001/chat/all/${e.target.getAttribute("idchat")}`,
        headers: {
          Authorization: `Bearer ${userObj.token}`,
        },
      }).then((res) => {
        if (res.data.status === "success") {
          const dataKirim = {
            idchat: dataChat._id,
            iduser: userData._id,
            idfriend: e.target.getAttribute("iduserreq"),
          };
          socket.emit("close_active_message", dataKirim);
        }
      });
    }
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        iduserreceive: e.target.getAttribute("iduserreq"),
      },
      url: `http://localhost:3001/chat/room/${userData._id}`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    }).then((res) => {
      setDataChat(res.data._doc);
      setIsChat(true);
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

  const sendMessage = () => {
    const dataKirim = {
      idchat: dataChat._id,
      iduser: userData._id,
      pesanKirim: pesanKirim,
    };
    socket.emit("send_message_pc", dataKirim);
    socket.emit("active_message", dataKirim);
    const inputPesan = document.querySelector(".personalchat .input-chats .input-pesan");
    inputPesan.value = "";
  };

  const showProfil = (e) => {
    setGeser(true);
    setIsLoading(true);
    console.log(e.target.getAttribute("idchat"));
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
      let tungguData = new Promise((fulfill, reject) => {
        if (dataFriend) {
          return fulfill(dataFriend);
        }
      });
      tungguData.then(() => {
        setIsLoading(false);
      });
    });
  };

  const deleteFriend = () => {
    console.log("hai");
  };

  const handleTerima = () => {
    setSpinnerTerima(true);
    setTimeout(() => {
      setSpinnerTerima(false);
      setShowModalInfo(true);
    }, 3000);
  };

  const showHideListFriends = () => {
    const showActiveChat = (param) => {
      let data = activeChat?.map((el) => {
        if (el.idfriend === param) {
          if (el.status === "active") {
            if (el.idfriend === el.chat) {
              return <span className={`red`}></span>;
            }
          }
        }
      });
      return data;
    };
    const setIdChat = (param) => {
      let data = activeChat?.map((el) => {
        if (el.idfriend === param) {
          return el.idchat;
        } else {
          return "null";
        }
      });
      return data[0];
    };
    if (showList === false) {
      if (dataUser.listFriends !== undefined) {
        if (dataUser.listFriends.length > 0) {
          let data = dataUser.listFriends.map((el) => {
            return (
              <div className="item-friends d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <div className="image ">
                    <img src="" alt="" />
                  </div>
                  <div className="friend">
                    <p className="p-0 m-0 text-capitalize">{el.nama}</p>
                    <button iduserreq={el.iduser} className="btn p-0 shadow-none" onClick={showProfil}>
                      @{el.username}
                    </button>
                  </div>
                </div>
                <div className="info">
                  <button className="btn p-0 shadow-none" iduserreq={el.iduser} idchat={setIdChat(el.iduser)} onClick={showChats}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-envelope-fill text-cyan" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                    </svg>
                  </button>
                  {showActiveChat(el.iduser)}
                </div>
              </div>
            );
          });
          return data;
        } else {
          return (
            <div className="pt-5 d-flex align-items-center justify-content-center">
              <p>Kamu belum Memiliki Teman</p>
            </div>
          );
        }
      }
    } else {
      if (dataUser.listWaitingReceive !== undefined) {
        if (dataUser.listWaitingReceive.length > 0) {
          let data = dataUser.listWaitingReceive.map((el) => {
            return (
              <div className="item-friends d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <div className="image me-lg-3 me-1">
                    <img src="" alt="" />
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
                      <div class="lds-ring d-inline-props">
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
    }
  };
  const tampilPesan = () => {
    if (dataChat?.chats.length > 0) {
      let data = dataChat.chats.map((el) => {
        if (el.iduser === userData._id) {
          return (
            <div className="chat-item me">
              <p className="value">{el.pesan}</p>
              <p className="jam me">{el.waktu}</p>
            </div>
          );
        } else {
          return (
            <div className="chat-item">
              <p className="value">{el.pesan}</p>
              <p className="jam me">{el.waktu}</p>
            </div>
          );
        }
      });
      return data;
    } else {
      return (
        <div className="chat-item notif-masuk">
          <p className="text-capitalize pb-0">Ayo Mulai percakapan dengan Teman Baru Mu</p>
        </div>
      );
    }
  };
  return (
    <>
      <section className="personalchat">
        <Header />
        <div className="container">
          <div className={`friends ${geser === true ? "geser" : ""}`}>
            <div className="navigasi-friends">
              <button className={`btn shadow-none ${showList === false ? "active" : ""}`} onClick={() => setShowList(false)}>
                Teman Saya
              </button>
              <button className={`btn shadow-none ${showList === true ? "active" : ""}`} onClick={() => setShowList(true)}>
                Permintaan Teman
              </button>
            </div>
            <div className="list-friends">{showHideListFriends()}</div>
          </div>
          <div className="box">
            {isChat === false ? (
              <div className="d-flex align-items-center justify-content-center banner flex-column">
                <img src={Message} alt="" />
                <p>Mulailah Berkomunikasi secara Personal kepada teman-teman Mu di SAIKA</p>
              </div>
            ) : (
              <>
                {isLoading === true ? (
                  <div className="position-relative h-100">
                    <div className="animasi-load mx-auto text-center">
                      <img src={IconProcess} alt="Icon Process" />
                      <div className="image"></div>
                      <p className="mt-4 mb-3">Mohon Ditunggu Beberapa Saat . . .</p>
                      <div className="sahabat">
                        <p>Loading</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {isFriendProfile === true ? (
                      <div className="position-relative h-100">
                        <div className="profile-friend ">
                          <div className="subjudul  text-sm-center text-start d-flex d-sm-block align-items-center mb-3 ">
                            <button className="btn p-0 me-3 d-sm-none back" onClick={hiddenChats}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-circle text-cyan" viewBox="0 0 16 16">
                                <path
                                  fill-rule="evenodd"
                                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                                />
                              </svg>
                            </button>
                            <p className="mb-0 mt-3">Profile Sahabat SAIKA</p>
                          </div>
                          <div className="image mx-auto d-none d-lg-block">
                            <img src={ImageHello} alt="" />
                          </div>
                          <div className="row justify-content-center align-items-center mb-3">
                            <div className="col-md mb-3">
                              <div className="image user ">
                                <img src={dataFriend?.fotoUrl} alt="Icon Process" />
                              </div>
                            </div>
                            <div className="col-md text-center text-lg-start ">
                              <p className="fs-5 fw-bold text-cyan">{dataFriend.jumlahTeman} Teman</p>
                              <p className="text-capitalize mb-0 ">{dataFriend?.nama}</p>
                              <p className="mb-0">@{dataFriend?.username}</p>
                              <p>{dataFriend?.email}</p>
                              <div class="d-flex">
                                <button className="btn btn-cyan" iduserreq={dataFriend?.iduser} onClick={showChats}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-send text-light me-3" viewBox="0 0 16 16">
                                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                  </svg>
                                  <span>Kirim Pesan</span>
                                </button>
                                <button className="btn ms-2 btn-secondary " onClick={handleShowModal}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                    <path
                                      fill-rule="evenodd"
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
                        <div className="row header-chats align-items-center">
                          <div className="col d-flex align-items-center">
                            <button className="btn p-0 me-3 d-sm-none" onClick={hiddenChats}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-circle text-cyan" viewBox="0 0 16 16">
                                <path
                                  fill-rule="evenodd"
                                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                                />
                              </svg>
                            </button>
                            <div className="image">
                              <img src="" alt="" />
                            </div>
                            <div className="identitas">
                              <p className="p-0 m-0 text-capitalize">{dataChat?.iduserpertama === userData._id ? dataChat.userkedua.nama : dataChat.userpertama.nama}</p>
                              <span>@{dataChat?.iduserpertama === userData._id ? dataChat.userkedua.username : dataChat.userpertama.username}</span>
                            </div>
                          </div>
                        </div>
                        <div className="list-chats">
                          <div className="position-relative h-100 w-100 ">
                            <div className="chat-value ">{tampilPesan()}</div>
                          </div>
                        </div>
                        <div className="input-chats">
                          <div className="position-relative h-100">
                            <textarea className="form-control input-pesan shadow-none border-0" placeholder="ketikan pesanmu disini" onChange={(e) => setPesanKirim(e.target.value)} />
                            <Button className="btn shadow-none" onClick={sendMessage}>
                              <img src={ChatSend} alt="Send" />
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
      <ModalElement show={showModal} funcModal={handleCloseModal} heading={"Konfirmasi"}>
        <div className="text-center py-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-exclamation-circle text-danger" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
          </svg>
          <p className="w-75 mx-auto mt-3 mb-3">Apakah Kamu Yakin Untuk menghapus Pertemanan ini?</p>
          <Button className="py-2 px-3 rounded-pill fs-6 btn btn-danger mb-4" onClick={deleteFriend}>
            Ya, Saya Yakin
          </Button>
        </div>
      </ModalElement>
      <ModalElement show={showModalTolak} funcModal={handleCloseModalTolak} heading={"Konfirmasi"}>
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-exclamation-circle text-danger" viewBox="0 0 16 16">
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
        <div class="d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-exclamation-circle me-3 text-success" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
          </svg>
          <span>Yeay, Sahabat Informatikamu bertambah satu</span>
        </div>
      </ModalElement>
    </>
  );
}
