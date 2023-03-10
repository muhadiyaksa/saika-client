import React, { useState, useEffect } from "react";
import Button from "../element/Button";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Axios from "axios";
import IconProcess from "../assets/image/process2.png";
import ModalElement from "../element/ModalElement";
import Signup from "../assets/image/Signup.svg";
import Sorry from "../assets/image/sorry.svg";
import Disconnected from "../assets/image/disconnected.png";
import ChatElement from "../parts/ChatElement";
import LoadingElement from "../parts/LoadingElement";

export default function Chats({ socket }) {
  const userObj = JSON.parse(localStorage.getItem("userSaika"));
  const userData = useSelector((state) => state.user.user);
  const param = useParams();
  const navigate = useNavigate();

  const geserList = () => {
    const listChats = document.querySelector(".chats .friends");
    listChats.classList.toggle("geser");
  };
  const tutupList = () => {
    const listChats = document.querySelector(".chats .friends");
    listChats.classList.toggle("geser");
  };

  const [dataMasuk, setdataMasuk] = useState({});
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
    getDataUser();
    const getDataRoom = () => {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3001/chats_detail/${param.idroom}`,
        headers: {
          Authorization: `Bearer ${userObj.token}`,
        },
      })
        .then((result) => {
          if (result.data) {
            socket.emit("join_room", result.data.idroom);
            socket.emit("data_user", userData._id);
            socket.emit("cek_anggota", result.data.idroom);
            setdataMasuk(result.data);
            setIsLoading(false);
            let dataAnggota = result.data.anggota.map((el) => el.iduser);
            if (!dataAnggota.includes(userData._id)) {
              setIsNotAnggota(true);
              console.log("kamu gamasuk room nih");
            } else {
              setIsNotAnggota(false);
              console.log("kamu masih jadi anggota kok");
            }
          }
        })
        .catch((err) => {
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

  const sendMessage = () => {
    const dataKirim = {
      idroom: param.idroom,
      iduser: userData._id,
      pesanKirim: pesanKirim,
    };

    let pesanMasuk = {
      iduser: userData._id,
      pesan: pesanKirim,
    };

    let chatsArray = [pesanMasuk, ...dataChatLoading];
    setDataChatLoading(chatsArray);

    socket.emit("send_message", dataKirim);
    const inputPesan = document.querySelector(".chats .input-chats .input-pesan");
    inputPesan.value = "";
  };

  const keluarRoom = () => {
    const dataKirim = {
      idroom: param.idroom,
      iduser: userData._id,
    };
    socket.emit("keluar_room", dataKirim);
    socket.emit("anggota_keluar", dataKirim);
  };

  useEffect(() => {
    socket.on("userLeft", function (data) {
      console.log(data);
    });
    socket.on("data_user_send", (data) => {
      setDataUser(data);
    });
    socket.on("data_user_receive", (data) => {
      setDataUser(data);
    });
    socket.on("pesan_terima", (data) => {
      setDataChatLoading([]);
      setdataMasuk(data);
    });

    socket.on("data_anggota_sisa", (data) => {
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

    socket.on("anggota_update", (data) => {
      let dataAnggotaUpdate = data.map((el) => el.iduser);
      if (!dataAnggotaUpdate.includes(userData._id)) {
        setIsKeluar(true);
      } else {
        setIsKeluar(false);
      }
    });

    socket.on("data_anggota", (data) => {
      setdataMasuk(data);
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

  const [show, setShow] = useState(false);
  const handleCloseNotif = () => setShow(false);

  const tambahTeman = (e) => {
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

  const terimaTeman = (e) => {
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

  const tolakTeman = (e) => {
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

  const hapusRoom = () => {
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

  console.log(dataProfilFriend);
  const tampilTeman = () => {
    if (dataMasuk?.anggota !== undefined) {
      let dataFilter = dataMasuk.anggota.filter((el) => el.iduser !== userData._id);
      let dataFilterListFriends = dataUser.listFriends ? dataUser.listFriends.map((el) => el.iduser) : [];
      let dataFilterListWaitingSend = dataUser.listWaitingSend ? dataUser.listWaitingSend.map((el) => el.iduser) : [];
      let dataFilterListWaitingReceive = dataUser.listWaitingReceive ? dataUser.listWaitingReceive.map((el) => el.iduser) : [];
      console.log(dataMasuk.anggota);
      let data = dataFilter.map((el) => {
        return (
          <div className="item-friends" key={el.iduser}>
            <div className="d-flex align-items-center">
              <div className="image me-lg-3 me-1">
                <img src={el.fotoUser === "" ? "/image/ava_user.jpg" : el.fotoUser} alt="" />
              </div>
              <div className="friend">
                <p className="p-0 m-0 text-capitalize ">{el.namauser}</p>
                <button iduser={el.iduser} className="btn p-0 text-decoration-underline text-cream shadow-none" onClick={checkProfileUser}>
                  @{el.usernameuser}
                </button>
              </div>
            </div>
            <div className="add">
              {dataFilterListFriends.includes(el.iduser) ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                </svg>
              ) : (
                <>
                  {dataFilterListWaitingReceive.includes(el.iduser) ? (
                    <div className="terima">
                      <button className="btn p-0 me-2 shadow-none" iduserreq={el.iduser} title="Terima Permintaan Pertemanan" onClick={terimaTeman}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-check-circle-fill text-cream" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                      </button>
                      <button className="btn p-0  shadow-none" iduserreq={el.iduser} title="Tolak Permintaan Pertemanan" onClick={tolakTeman}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-x text-softwhite" viewBox="0 0 16 16">
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      {dataFilterListWaitingSend.includes(el.iduser) ? (
                        <div className="wait">
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-hourglass-split text-cream" viewBox="0 0 16 16">
                            <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                          </svg>
                        </div>
                      ) : (
                        <button className="btn btn-outline-cyan " iduserreq={el.iduser} onClick={tambahTeman}>
                          + <span className="d-none d-lg-inline-block">Teman</span>
                        </button>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        );
      });
      return data;
    }
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
                <Button isPrimary onClick={hapusRoom} className="text-decoration-none  w-auto">
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
                                <button className="btn btn-outline-danger me-3 me-sm-0" onClick={keluarRoom}>
                                  Keluar Room
                                </button>
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
                                  <ChatElement dataChatLoading={dataChatLoading} dataChat={dataMasuk} userData={userData} />
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
                                <img src={dataMasuk?.kategori === "mm" ? "/image/multimedia.svg" : dataMasuk?.kategori === "jarkom" ? "/image/jaringan.svg" : "/image/rpl.svg"} alt="" className="img-fluid topik me-3" />
                                <p className="judul-1 text-softwhite text-center text-lg-start tema">
                                  Tema : <br /> {dataMasuk?.kategori === "mm" ? "Multimedia" : dataMasuk?.kategori === "jarkom" ? "Jaringan Komputer" : "Rekayasa Perangkat Lunak"}
                                </p>
                              </div>
                            </div>
                            <div className="list-friends">
                              <p className="judul-1 mb-2">Daftar Anggota</p>
                              <div className="items-friends">
                                <div className="item-friends" key={userData.iduser}>
                                  <div className="d-flex align-items-center">
                                    <div className="image me-lg-3 me-1">
                                      <img src={dataUser.fotoUser?.fotoUrl === "" ? "/image/ava_user.jpg" : dataUser.fotoUser?.fotoUrl} alt="" />
                                    </div>
                                    <div className="friend">
                                      <p className="p-0 m-0">Saya</p>
                                      <Button type="link" href="/">
                                        {userData.username}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                {tampilTeman()}
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
          <div className="row justify-content-center align-items-center mb-3 profileteman">
            {spinnerFriend === true ? (
              <div className="position-relative h-100">
                <div className="animasi-load mx-auto text-center">
                  <img src={IconProcess} alt="Icon Process" />
                  <p className="mt-4 mb-3">Mohon Ditunggu Beberapa Saat . . .</p>
                  <div className="sahabat">
                    <p>Loading</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row align-items-center mt-3">
                <div className="col-md mb-3">
                  <div className="image user mx-auto">
                    <img src={dataProfilFriend?.fotoProfil} alt="Icon Process" />
                  </div>
                </div>
                <div className="col-md text-center text-lg-start text-softwhite ">
                  <p className="fs-5 fw-bold text-cream">{dataProfilFriend?.jumlahTeman} Teman</p>
                  <p className="text-capitalize mb-0 ">{dataProfilFriend?.nama}</p>
                  <p className="mb-0">@{dataProfilFriend?.username}</p>
                  <p>{dataProfilFriend?.email}</p>
                </div>
              </div>
            )}
          </div>
        </ModalElement>
      </div>
    </section>
  );
}
