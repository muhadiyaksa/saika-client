import React, { useState, useEffect } from "react";
import mm from "../assets/image/multimedia.png";
import jarkom from "../assets/image/jarkom.png";
import rpl from "../assets/image/rpl.png";
import Button from "../element/Button";
import ChatSend from "../assets/icon/send.png";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import io from "socket.io-client";
import Axios from "axios";
import IconProcess from "../assets/image/process2.png";
import ModalElement from "../element/ModalElement";
import Signup from "../assets/image/Signup.svg";
import Sorry from "../assets/image/sorry.svg";

export default function Chats() {
  const socket = io.connect("http://localhost:3001");
  console.log(socket);

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
  // const [dataAnggota, setdataAnggota] = useState([]);
  const [pesanKirim, setPesanKirim] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSisaAnggota, setIsSisaAnggota] = useState(true);
  const [isKeluar, setIsKeluar] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [dataProfilFriend, setDataProfilFriend] = useState({});
  const [showFriend, setShowFriend] = useState(false);
  const [spinnerFriend, setSpinnerFriend] = useState(false);
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
      }).then((result) => {
        if (result.data) {
          socket.emit("join_room", result.data.idroom);
          socket.emit("data_user", userData._id);
          setdataMasuk(result.data);
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
    socket.on("data_user_send", (data) => {
      console.log(data);
      setDataUser(data);
    });
    socket.on("data_user_receive", (data) => {
      setDataUser(data);
    });
    socket.on("pesan_terima", (data) => {
      console.log(data);
      setdataMasuk(data);
    });

    socket.on("data_anggota_sisa", (data) => {
      let dataAnggota = data.anggota.map((el) => el.iduser);
      console.log(data);
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

    socket.on("data_anggota", (data) => {
      setdataMasuk(data);
      // setIsLoading(false);
      if (data.anggota.length === 1) {
        setShow(false);
      } else {
        setShow(true);
      }
    });
  }, [socket]);

  const [show, setShow] = useState(false);
  const handleCloseNotif = () => setShow(false);
  const tambahTeman = (e) => {
    console.log(e.target);
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
  const tampilTeman = () => {
    if (dataMasuk.anggota !== undefined) {
      let dataFilter = dataMasuk.anggota.filter((el) => el.iduser !== userData._id);
      let dataFilterListFriends = dataUser.listFriends ? dataUser.listFriends.map((el) => el.iduser) : [];
      let dataFilterListWaitingSend = dataUser.listWaitingSend ? dataUser.listWaitingSend.map((el) => el.iduser) : [];
      let dataFilterListWaitingReceive = dataUser.listWaitingReceive ? dataUser.listWaitingReceive.map((el) => el.iduser) : [];

      console.log(dataFilter);
      let data = dataFilter.map((el) => {
        return (
          <div className="item-friends" key={el.iduser}>
            <div className="d-flex align-items-center">
              <div className="image me-lg-3 me-1">
                <img src="" alt="" />
              </div>
              <div className="friend">
                <p className="p-0 m-0 text-capitalize ">{el.namauser}</p>
                <button iduser={el.iduser} className="btn p-0 text-decoration-underline shadow-none" onClick={checkProfileUser}>
                  @{el.usernameuser}
                </button>
              </div>
            </div>
            <div className="add">
              {dataFilterListFriends.includes(el.iduser) ? (
                ""
              ) : (
                <>
                  {dataFilterListWaitingReceive.includes(el.iduser) ? (
                    <div className="terima">
                      <button className="btn p-0 me-2 shadow-none" iduserreq={el.iduser} title="Terima Permintaan Pertemanan" onClick={terimaTeman}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-check-circle-fill text-cyan" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                      </button>
                      <button className="btn p-0  shadow-none" iduserreq={el.iduser} title="Tolak Permintaan Pertemanan" onClick={tolakTeman}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      {dataFilterListWaitingSend.includes(el.iduser) ? (
                        <div className="wait">
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-hourglass-split text-light" viewBox="0 0 16 16">
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

  const tampilPesan = () => {
    if (dataMasuk.chats !== undefined) {
      let data = dataMasuk.chats.map((el) => {
        if (el.pesan) {
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
                <p className="user text-capitalize mb-2">{el.usernameuser}</p>
                <p className="value">{el.pesan}</p>
                <p className="jam">{el.waktu}</p>
              </div>
            );
          }
        } else {
          if (el.kondisi === "keluar") {
            return (
              <div className="chat-item notif-keluar">
                <p className="text-capitalize pb-0">
                  <strong>{el.namauser}</strong> Keluar dari Room
                </p>
              </div>
            );
          } else {
            return (
              <div className="chat-item notif-masuk">
                <p className="text-capitalize pb-0">
                  <strong>{el.namauser}</strong> Masuk Room
                </p>
              </div>
            );
          }
        }
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
          <div className="animasi-load mx-auto text-center">
            <img src={IconProcess} alt="Icon Process" />
            <div className="image"></div>
            <p className="mt-4 mb-3">
              Saika Sedang Mempersiapkan Ruang Diskusi Mu <br />
              Mohon Ditunggu Beberapa Saat . . .
            </p>
            <div className="sahabat">
              <p>Loading</p>
            </div>
          </div>
        ) : (
          <>
            {isSisaAnggota === false ? (
              <div className="sorry mx-auto text-center pt-5">
                <img src={Sorry} alt="Icon animasi" />
                <p className="mt-4">
                  Yahh Ruang Diskusi kamu Sudah Sepi <br />
                  teman-teman mu telah meninggalkan ruang diskusi. . .
                </p>
                <Button isPrimary onClick={hapusRoom} className="text-decoration-none text-white w-auto">
                  Cari Teman SAIKA
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
                            <span>Live Sedang Berlangsung</span>
                          </div>
                          <div className="col text-end">
                            <button className="btn btn-outline-danger me-3 me-sm-0" onClick={keluarRoom}>
                              Keluar Room
                            </button>
                            <button className="btn btn-outline-cyan d-sm-none" onClick={geserList}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-lines-fill text-cyan" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="list-chats">
                          <div className="position-relative h-100 w-100 ">
                            <div className="chat-value ">{tampilPesan()}</div>
                          </div>
                        </div>
                        <div className="input-chats">
                          <div className="position-relative">
                            <textarea className="form-control input-pesan" placeholder="ketikan pesanmu disini" onChange={(e) => setPesanKirim(e.target.value)} />
                            <Button className="btn shadow-none" onClick={sendMessage}>
                              <img src={ChatSend} alt="Send" />
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
                            <img src={dataMasuk.kategori === "mm" ? mm : dataMasuk.kategori === "jarkom" ? jarkom : rpl} alt="" className="img-fluid topik me-3" />
                            <p className="judul-1 text-cyan text-center text-lg-start tema">
                              Tema : <br /> {dataMasuk.kategori === "mm" ? "Multimedia" : dataMasuk.kategori === "jarkom" ? "Jaringan Komputer" : "Rekayasa Perangkat Lunak"}
                            </p>
                          </div>
                        </div>
                        <div className="list-friends">
                          <p className="judul-1 mb-2">Daftar Anggota</p>
                          <div className="items-friends">
                            <div className="item-friends" key={userData.iduser}>
                              <div className="d-flex align-items-center">
                                <div className="image me-lg-3 me-1">
                                  <img src="" alt="" />
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

        <ModalElement show={show} funcModal={handleCloseNotif} heading={"Surat Spesial"}>
          <div className="text-center">
            <img src={Signup} alt="" />
            <p className="w-75 mx-auto mt-3" style={{ fontSize: "13px" }}>
              Yeayyy! Kamu ketemu temen baru nih, Ngobrolnya yang baik-baik yaa
            </p>
            <Button isPrimary className="w-100  fs-6" onClick={handleCloseNotif}>
              Terimakasih Mimin Saika
            </Button>
          </div>
        </ModalElement>
        <ModalElement show={showFriend} funcModal={handleCloseFriend} isHeader={false} isCentered={true}>
          <div className="row justify-content-center align-items-center mb-3">
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
              <div class="row align-items-center mt-3">
                <div className="col-md mb-3">
                  <div className="image user mx-auto">
                    <img src={dataProfilFriend?.fotoUrl} alt="Icon Process" />
                  </div>
                </div>
                <div className="col-md text-center text-lg-start ">
                  <p className="fs-5 fw-bold text-cyan">{dataProfilFriend?.jumlahTeman} Teman</p>
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
