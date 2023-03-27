import React, { useState, useEffect } from "react";
import Button from "../element/Button";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Axios from "axios";
import IconProcess from "../assets/image/process2.png";
import ModalElement from "../element/ModalElement";
import Signup from "../assets/image/Signup.svg";
import ChatElement from "../parts/ChatElement";
import LoadingElement from "../parts/LoadingElement";
import ListOfFriendsElement from "../parts/ListOfFriendsElement";

export default function Chats({ socket }) {
  const userObj = JSON.parse(localStorage.getItem("userSaika"));
  const param = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userDataLocal = useSelector((state) => state.user.user);
  const userData = isLoggedIn ? userDataLocal : { _id: sessionStorage.getItem("iduseranonymous") };
  console.log(userData);

  const geserList = () => {
    const listChats = document.querySelector(".chats .friends");
    listChats.classList.toggle("geser");
  };
  const tutupList = () => {
    const listChats = document.querySelector(".chats .friends");
    listChats.classList.toggle("geser");
  };

  const [dataRoom, setDataRoom] = useState({});
  const [dataChatLoading, setDataChatLoading] = useState([]);
  const [pesanKirim, setPesanKirim] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSisaAnggota, setIsSisaAnggota] = useState(true);
  const [isKeluar, setIsKeluar] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [dataProfilFriend, setDataProfilFriend] = useState({});
  const [showFriend, setShowFriend] = useState(false);
  const [spinnerFriend, setSpinnerFriend] = useState(false);
  const [isNotAnggota, setIsNotAnggota] = useState(false);

  useEffect(() => {
    // MENGAMBIL DATA PROFIL USER
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
      });
    };
    if (isLoggedIn) {
      getDataUser();
    }

    // MENGAMBIL DATA DETAIL ROOM
    const getDataRoom = () => {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3001/chats_detail/${param.idroom}`,
      })
        .then((result) => {
          if (result.data) {
            if (isLoggedIn) {
              socket.emit("data_user", userData._id);
            }
            let dataAnggota = result.data.anggota.map((el) => el.iduser);
            dataAnggota.length === 1 ? setIsSisaAnggota(false) : setIsSisaAnggota(true);
            if (!dataAnggota.includes(userData._id)) {
              setIsNotAnggota(true);
              console.log("kamu gamasuk room nih");
            } else {
              setIsNotAnggota(false);
              console.log("kamu masih jadi anggota kok");
            }
            socket.emit("join_room", result.data.idroom);
            socket.emit("cek_anggota", result.data.idroom);

            setDataRoom(result.data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
            setIsLoading(false);
            setIsKeluar(true);
          } else {
            setIsLoading(false);
          }
        });
    };
    getDataRoom();
  }, []);

  const [limitAnonymous, setLimitAnonymous] = useState(false);
  const handleCloseLimitAnonymous = () => {
    setLimitAnonymous(false);
  };

  const sendMessage = () => {
    const dataKirim = {
      idroom: param.idroom,
      iduser: userData._id,
      pesanKirim: pesanKirim,
      username: isLoggedIn ? dataUser.username : userData._id,
    };

    let pesanMasuk = {
      iduser: userData._id,
      pesan: pesanKirim,
    };
    if (localStorage.getItem("limitAnonymous")) {
      setLimitAnonymous(true);
    } else {
      let chatsArray = [pesanMasuk, ...dataChatLoading];
      setDataChatLoading(chatsArray);

      socket.emit("send_message", dataKirim);
    }
    const inputPesan = document.querySelector(".chats .input-chats .input-pesan");
    inputPesan.value = "";
  };

  const [isAttGetOut, setIsAttGetOut] = useState(false);
  const getOutFromRoom = () => {
    // setIsAttGetOut(true);
    const dataKirim = {
      idroom: param.idroom,
      iduser: userData._id,
      nama: isLoggedIn ? dataUser.nama : userData._id,
    };
    console.log(dataKirim, "datakirimnih esss");
    socket.emit("keluar_room", dataKirim);
    socket.emit("anggota_keluar", dataKirim);
  };
  const [show, setShow] = useState(false);
  const handleCloseNotif = () => setShow(false);

  useEffect(() => {
    // socket.on("userLeft", function (data) {
    //   console.log(data);
    // });
    socket.on("data_user_send", (data) => {
      setDataUser(data);
    });
    socket.on("data_user_receive", (data) => {
      setDataUser(data);
    });
    socket.on("pesan_terima", (data) => {
      setDataChatLoading([]);
      setDataRoom(data);

      let checkLimitAnonymous = data?.chats.filter((el) => el.iduser === userData._id && el.pesan && el.iduser.includes("anonymous"));
      if (checkLimitAnonymous.length > 8) {
        setLimitAnonymous(true);
        localStorage.setItem("limitAnonymous", true);
      } else {
        localStorage.removeItem("limitAnonymous");
        setLimitAnonymous(false);
      }
    });

    socket.on("data_anggota_sisa", (data) => {
      setDataRoom(data);
      let dataAnggota = data.anggota.map((el) => el.iduser);
      if (!dataAnggota.includes(userData._id)) {
        setIsKeluar(true);
      } else {
        if (data.anggota.length === 1) {
          setIsSisaAnggota(false);
        } else {
          setIsSisaAnggota(true);
        }
      }
    });

    // NGECEK APAKAH USER MASIH DALAM ANGGOTA, KALO TIDAK MAKA KELUAR
    socket.on("anggota_update", (data) => {
      let dataAnggotaUpdate = data.map((el) => el.iduser);
      if (!dataAnggotaUpdate.includes(userData._id)) {
        setIsKeluar(true);
      } else {
        setIsKeluar(false);
      }
    });

    socket.on("data_anggota", (data) => {
      setDataRoom(data);
      let dataAnggota = data.anggota.map((el) => el.iduser);
      if (data.anggota.length === 1) {
        setShow(false);
        setIsSisaAnggota(false);
      } else {
        if (dataAnggota.includes(userData._id)) {
          setShow(true);
        } else {
          setShow(false);
        }
        setIsSisaAnggota(true);
      }
    });
  }, []);

  const checkIsAnonymous = () => {
    let dataFilter = dataRoom.anggota.filter((el) => el.iduser.includes("anonymous"));
    if (dataFilter.length > 0 && !userData._id.includes("anonymous")) {
      return (
        <div className={`mt-2 info-anonymous d-flex  text-softwhite`} role="alert" style={{ fontSize: "12px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-fill-check me-2" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"
            />
          </svg>
          <span>Anonymous tidak akan dapat melihat profil kamu</span>
        </div>
      );
    } else if (dataFilter.length > 0 && userData._id.includes("anonymous")) {
      return (
        <div className={`mt-2 info-anonymous d-flex text-warning`} role="alert" style={{ fontSize: "12px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-fill-slash me-2" viewBox="0 0 16 16">
            <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465l3.465-3.465Zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465Zm-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
          </svg>
          <span>Kamu adalah anonymous, tidak dapat melihat profile dan Fitur kominukasi yang terbatas</span>
        </div>
      );
    } else {
      return "";
    }
  };

  const addFriend = (e) => {
    Axios({
      method: "PUT",
      withCredentials: true,
      data: {
        iduserreq: e.target.getAttribute("iduserreq"),
      },
      url: `http://localhost:3001/user/friend/${userData._id}`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    }).then((res) => {
      if (res.data.status === "success") {
        socket.emit("update_data_user", { pengirim: res.data.iduserpengirim, penerima: res.data.iduserpenerima });
      }
    });
  };

  const acceptFriend = (e) => {
    Axios({
      method: "PUT",
      withCredentials: true,
      data: {
        iduserreq: e.target.getAttribute("iduserreq"),
      },
      url: `http://localhost:3001/user/accept-friend/${userData._id}`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    }).then((res) => {
      if (res.data.status === "success") {
        socket.emit("update_data_user", { pengirim: res.data.iduserpenerima, penerima: res.data.iduserditerima });
      }
    });
  };

  const checkProfileUser = (e) => {
    setShowFriend(true);
    if (dataProfilFriend.iduser !== e.target.getAttribute("iduser")) {
      setSpinnerFriend(true);
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3001/user/friend/${e.target.getAttribute("iduser")}`,
        headers: {
          Authorization: `Bearer ${userObj.token}`,
        },
      }).then((res) => {
        setDataProfilFriend(res.data);
        setSpinnerFriend(false);
      });
    }
  };

  const handleCloseFriend = () => {
    setShowFriend(false);
  };

  const rejectFriend = (e) => {
    Axios({
      method: "PUT",
      withCredentials: true,
      data: {
        iduserreq: e.target.getAttribute("iduserreq"),
      },
      url: `http://localhost:3001/user/reject-friend/${userData._id}`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    }).then((res) => {
      if (res.data.status === "success") {
        socket.emit("update_data_user", { pengirim: res.data.iduserpenolak, penerima: res.data.iduserditolak });
      }
    });
  };

  const getOutandDeleteRoom = () => {
    Axios({
      method: "DELETE",
      withCredentials: true,
      url: `http://localhost:3001/chat/${param.idroom}`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    }).then(() => {
      navigate("/find");
    });
  };

  const [showAfterJoin, setAfterJoinButEmpty] = useState(false);
  const handleAfterJoinButEmpty = () => {
    setAfterJoinButEmpty(false);
  };

  const joinRoom = () => {
    Axios({
      method: "POST",
      withCredentials: true,
      data: {
        iduser: userData._id,
        fotoUser: "",
        namauser: dataUser.nama,
        usernameuser: dataUser.username ? dataUser.username : "@anonymous",
      },
      url: `http://localhost:3001/rejoinchats/${param.idroom}`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    })
      .then((res) => {
        if (res.data.status === "finish") {
          console.log(res.data);
          socket.emit("data_anggota", res.data.idroom);
          socket.emit("anggota_masuk", { idroom: res.data.idroom, iduser: userData._id });
          setIsNotAnggota(false);
          setIsLoading(false);
          setIsKeluar(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setAfterJoinButEmpty(true);
        }
      });
  };

  //BUAT TAMPIL ANGGOTA CHAT NOTIF
  //TERUS DIGABUNG TAMPILnggotakeluar ama masuk
  //abis itu dibuat object yang data anggota keluarnya

  return (
    <section className="chats">
      <div className="container">
        {isLoading === true ? (
          <LoadingElement />
        ) : (
          <>
            {isSisaAnggota === false ? (
              <div className="sorry mx-auto text-center pt-5">
                <img src="/image/sorry.svg" alt="Icon animasi" />
                <p className="mt-4 text-softwhite">
                  Yahh Ruang Diskusi kamu Sudah Sepi <br />
                  teman-teman mu telah meninggalkan ruang diskusi. . .
                </p>
                <Button isPrimary onClick={getOutandDeleteRoom} className="text-decoration-none  w-auto">
                  Cari Teman SAIKA
                </Button>
              </div>
            ) : (
              <>
                {isNotAnggota === true ? (
                  <div className="sorry mx-auto text-center pt-5">
                    <img src="/image/disconnect.svg" alt="Icon Disconnected" />
                    <p className="mt-4 text-softwhite">
                      Ups Masalah Jaringan, Kamu keluar dari room <br />
                      Join lagi kuy. . .
                    </p>
                    <Button isPrimary onClick={joinRoom} className="text-decoration-none  w-auto">
                      Join Kembali
                    </Button>
                    <Button isSecondary type="link" href="/find" className=" mt-4 d-block" style={{ fontSize: "12px" }}>
                      Keluar
                    </Button>
                  </div>
                ) : (
                  <>
                    {isKeluar === false ? (
                      <>
                        <div className="box">
                          <div className="position-relative h-100">
                            <div className="row header-chats align-items-center">
                              <div className="col d-flex align-items-center">
                                <span className="red"></span>
                                <span className="text-softwhite">Live Sedang Berlangsung</span>
                              </div>
                              <div className="col text-end">
                                <Button className={`btn btn-danger d-inline-flex align-items-center me-3 me-sm-0 text-dongker ${isAttGetOut ? "disabled" : ""}`} isSpinner={isAttGetOut} onClick={getOutFromRoom}>
                                  <span style={{ fontSize: "13px" }}>Keluar Room</span>
                                </Button>
                                <button className="btn btn-outline-cyan d-sm-none" onClick={geserList}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-lines-fill text-cream" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="list-chats">
                              <div className="position-relative h-100 w-100 ">
                                <div className="chat-value ">
                                  {/* {tampilPesan()} */}
                                  <ChatElement dataChatLoading={dataChatLoading} dataChat={dataRoom} userData={isLoggedIn ? userData : { _id: sessionStorage.getItem("iduseranonymous") }} typeChat={"notpersonal"} isLoggedIn={isLoggedIn} />
                                </div>
                              </div>
                            </div>
                            <div className="input-chats">
                              <div className="position-relative">
                                <textarea className="form-control input-pesan shadow-none border-0" placeholder="ketikan pesanmu disini" onChange={(e) => setPesanKirim(e.target.value)} />
                                <Button className="btn shadow-none text-cream" onClick={sendMessage}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class={`bi bi-send-fill text-cream `} viewBox="0 0 16 16" style={{ transform: "rotate(45deg)" }}>
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                  </svg>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="friends">
                          <div className="position-relative h-100">
                            <div className="header-friends">
                              <div className="d-flex justify-content-between align-items-center">
                                <p className="judul-1 ">Topik Live Sesi</p>
                                <button className="btn p-0 d-sm-none" onClick={tutupList}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg text-dark" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                  </svg>
                                </button>
                              </div>
                              <div className=" d-flex flex-column flex-lg-row align-items-center justify-content-center">
                                <img src={dataRoom?.kategori === "mm" ? "/image/multimedia.svg" : dataRoom?.kategori === "jarkom" ? "/image/jaringan.svg" : "/image/rpl.svg"} alt="" className="img-fluid topik me-3" />
                                <p className="judul-1 text-softwhite text-center text-lg-start tema">
                                  Tema : <br /> {dataRoom?.kategori === "mm" ? "Multimedia" : dataRoom?.kategori === "jarkom" ? "Jaringan Komputer" : "Rekayasa Perangkat Lunak"}
                                </p>
                              </div>
                              {checkIsAnonymous()}
                            </div>
                            <div className="list-friends">
                              <p className="judul-1 mb-2">Daftar Anggota</p>
                              <div className="items-friends">
                                <div className="item-friends" key={isLoggedIn ? userData.iduser : sessionStorage.getItem("iduseranonymous")}>
                                  <div className="d-flex align-items-center">
                                    <div className="image me-lg-3 me-1">
                                      <img src={dataUser.fotoUser?.fotoUrl === "" ? "/image/ava_user.jpg" : dataUser.fotoUser?.fotoUrl} alt="" />
                                    </div>
                                    <div className="friend">
                                      <p className="p-0 m-0">Saya</p>
                                      {/* <Button type="link" href="/">
                                        {isLoggedIn ? userData.username : sessionStorage.getItem("iduseranonymous")}
                                      </Button> */}
                                    </div>
                                  </div>
                                </div>
                                <ListOfFriendsElement
                                  dataRoom={dataRoom}
                                  dataUser={dataUser}
                                  userData={userData}
                                  isLoggedIn={isLoggedIn}
                                  checkProfileUser={checkProfileUser}
                                  acceptFriend={acceptFriend}
                                  rejectFriend={rejectFriend}
                                  addFriend={addFriend}
                                />
                                {/* {showListOfFriends()} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Navigate to="/find" />
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}

        <ModalElement isDongker show={showAfterJoin} funcModal={handleAfterJoinButEmpty} isHeader={false} isCentered={true}>
          <div className="d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-exclamation-circle text-danger me-3" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
            <span>Room sudah tidak ada</span>
          </div>
        </ModalElement>

        <ModalElement isDongker show={show} funcModal={handleCloseNotif} heading={"Surat Spesial"}>
          <div className="text-center">
            <img src={Signup} alt="" />
            <p className="w-75 mx-auto mt-3" style={{ fontSize: "13px" }}>
              Yeayyy! Kamu ketemu temen baru nih, Ngobrolnya yang baik-baik yaa
            </p>
            <Button isSecondary className="w-100 mt-4" onClick={handleCloseNotif}>
              Tutup
            </Button>
          </div>
        </ModalElement>
        <ModalElement show={showFriend} isDongker funcModal={handleCloseFriend} isHeader={false} isCentered={true}>
          <div className="row justify-content-center align-items-center mb-3 ">
            {spinnerFriend ? (
              <div className="position-relative h-100">
                <LoadingElement simple />
              </div>
            ) : (
              <div className="row align-items-center mt-3">
                <div className="col-md mb-3">
                  <div className="image user mx-auto">
                    <img src={dataProfilFriend?.fotoProfil === "" ? "/image/ava_user.jpg" : dataProfilFriend?.fotoProfil} alt="Icon Process" />
                  </div>
                </div>
                <div className="col-md text-center text-lg-start text-softwhite ">
                  <p className="fs-5 fw-bold text-cream d-inline-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-people-fill me-2" viewBox="0 0 16 16">
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    </svg>{" "}
                    {dataProfilFriend?.jumlahTeman}{" "}
                  </p>
                  <p className="text-capitalize mb-0 ">{dataProfilFriend?.nama}</p>
                  <p className="mb-0">@{dataProfilFriend?.username}</p>
                  <p>{dataProfilFriend?.email}</p>
                </div>
              </div>
            )}
          </div>
        </ModalElement>
        <ModalElement isDongker show={limitAnonymous} isCentered={true} funcModal={handleCloseLimitAnonymous}>
          <div className="p-4  position-relative d-flex flex-column align-items-center">
            <Button className="btn fw-bold shadow-none p-0 text-cream d-block ms-auto position-absolute" onClick={handleCloseLimitAnonymous} style={{ fontSize: "14px", top: "10px", right: "10px" }}>
              x
            </Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-exclamation d-block text-danger mx-auto mb-3" viewBox="0 0 16 16">
              <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
              <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5Zm0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
            </svg>
            <p className="text-softwhite fw-light" style={{ fontSize: "13px", textAlign: "center" }}>
              Kamu sudah mencapai limit dalam berkomunikasi di grup,{" "}
              <span class="text-cream" style={{ fontSize: "13px" }}>
                Daftar sebagai Anggota SAIKA
              </span>{" "}
              untuk komunikasi tanpa batas, melihat profil teman, menambah teman dan berkomunikasi secara personal
            </p>

            <Button isPrimary className="py-2 px-3   my-3 text-decoration-none rounded d-inline-flex align-items-center justify-content-center" onClick={getOutFromRoom} style={{ width: "120px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right me-2" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                />
                <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
              </svg>
              Daftar
            </Button>
          </div>
        </ModalElement>
      </div>
    </section>
  );
}
