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
import IconAnimasi from "../assets/image/animation.png";
import ModalElement from "../element/ModalElement";
import Signup from "../assets/image/Signup.svg";

export default function Chats() {
  const socket = io.connect("http://localhost:3001");
  const userObj = JSON.parse(localStorage.getItem("userSaika"));
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
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
  const [dataAnggota, setdataAnggota] = useState([]);
  const [pesanKirim, setPesanKirim] = useState("");
  const [dataAnggotaKeluar, setDataAnggotaKeluar] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLengthAnggota, setIsLengthAnggota] = useState(true);
  useEffect(() => {
    const getDataRoom = () => {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3001/chats_detail/${param.idroom}`,
        headers: {
          Authorization: `Bearer ${userObj.token}`,
        },
      }).then((result) => {
        console.log(result.data);
        if (result.data) {
          socket.emit("join_room", param.idroom);
          socket.emit("data_anggota", param.idroom);
          setdataMasuk(result.data);
          setTimeout(() => {
            setIsLoading(false);
            setShow(true);
            if (result.data.anggota.length === 1) {
              setIsLengthAnggota(true);
            } else {
              setIsLengthAnggota(false);
            }
          }, 5000);
          // let dataAnggota = result.data.anggota.filter((el) => el.iduser === userData._id);
          // console.log(dataAnggota);
          // if (dataAnggota.length !== 1) {
          //   // navigate("/find");
          // } else {
          //   console.log("ya berarti kesini ");
          // }
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
    if (!dataAnggota.includes(userData._id)) {
      navigate("/find");
    }
  };
  useEffect(() => {
    socket.on("pesan_terima", (data) => {
      console.log(data);
      setdataMasuk(data);
    });

    socket.on("data_anggota", (data) => {
      let dataAnggota = data.anggota.map((el) => el.iduser);
      setdataMasuk(data);
      setdataAnggota(dataAnggota);
      console.log(dataAnggota);
    });

    socket.on("anggota_keluar_notif", (data) => {
      setDataAnggotaKeluar(data);
    });
  }, [socket]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const tampilTeman = () => {
    if (dataMasuk.anggota !== undefined) {
      let dataFilter = dataMasuk.anggota.filter((el) => el.iduser !== userData._id);
      let data = dataFilter.map((el) => {
        return (
          <div class="item-friends" key={el.iduser}>
            <div class="d-flex align-items-center">
              <div class="image me-lg-3 me-1">
                <img src="" alt="" />
              </div>
              <div class="friend">
                <p className="p-0 m-0 text-capitalize ">{el.namauser}</p>
                <Button type="link" href="/">
                  @{el.usernameuser}
                </Button>
              </div>
            </div>
            <div class="add">
              <Button className="btn btn-outline-cyan ">
                + <span className="d-none d-lg-inline-block">Teman</span>
              </Button>
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
        if (el.iduser === userData._id) {
          return (
            <div class="chat-item me">
              <p className="value">{el.pesan}</p>
              <p className="jam me">{el.waktu}</p>
            </div>
          );
        } else {
          return (
            <div class="chat-item">
              <p className="user text-capitalize mb-2">{el.usernameuser}</p>
              <p className="value">{el.pesan}</p>
              <p className="jam">{el.waktu}</p>
            </div>
          );
        }
      });
      return data;
    }
  };
  const tampilAnggotaKeluar = () => {
    if (dataAnggotaKeluar !== "") {
      return (
        <div class="chat-item notif-keluar">
          <p className="text-capitalize pb-0">
            <strong>{dataAnggotaKeluar}</strong> Keluar dari Room
          </p>
        </div>
      );
    }
  };
  console.log(dataAnggota);
  return (
    <section className="chats">
      <div class="container">
        {isLoading === true ? (
          <div class="animasi-load mx-auto text-center">
            <img src={IconAnimasi} alt="Icon animasi" />
            <p className="mt-4">
              Saika Sedang Mencarikanmu <br />
              Teman Yang Sedang Aktif, harap tunggu . . .
            </p>
            <span>Sahabat Informatika</span>
          </div>
        ) : (
          <>
            {isLengthAnggota === false ? (
              <div class="animasi-load mx-auto text-center">
                <img src={IconAnimasi} alt="Icon animasi" />
                <p className="mt-4">
                  Saika Sedang Mencarikanmu <br />
                  Teman Yang Sedang Aktif, harap tunggu . . .
                </p>
                <span>Sahabat Informatika</span>
              </div>
            ) : (
              <>
                <div class="box">
                  <div class="position-relative h-100">
                    <div class="row header-chats align-items-center">
                      <div class="col d-flex align-items-center">
                        <span class="red"></span>
                        <span>Live Sedang Berlangsung</span>
                      </div>
                      <div class="col text-end">
                        <button className="btn btn-outline-danger me-3 me-sm-0" onClick={keluarRoom}>
                          Keluar Room
                        </button>
                        <button className="btn btn-outline-cyan d-sm-none" onClick={geserList}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-lines-fill text-cyan" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div class="list-chats">
                      <div class="position-relative h-100 w-100 ">
                        <div class="chat-value ">
                          {tampilAnggotaKeluar()}
                          {tampilPesan()}
                          {/* {dataMasuk.map((el) => {
                      return (
                        <div class="chat-item me">
                          <p className="value">{el.message}</p>
                          <p className="jam me">10:04</p>
                        </div>
                      );
                    })} */}
                          {/* <div class="chat-item">
                      <p className="user">Kiki</p>
                      <p className="value">Ni percobaan ya kalo misal bisa pasti aku seneng banget</p>
                      <p className="jam">10:04</p>
                    </div>
                    <div class="chat-item me">
                      <p className="value">Ni percobaan ya kalo misal bisa pasti aku seneng banget</p>
                      <p className="jam me">10:04</p>
                    </div> */}
                        </div>
                      </div>
                    </div>
                    <div class="input-chats">
                      <div class="position-relative">
                        <input type="text" className="form-control input-pesan" placeholder="ketikan pesanmu disini" onChange={(e) => setPesanKirim(e.target.value)} />
                        <Button className="btn" onClick={sendMessage}>
                          <img src={ChatSend} alt="Send" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="friends">
                  <div class="position-relative h-100">
                    <div class="header-friends">
                      <div class="d-flex justify-content-between align-items-center">
                        <p className="judul-1 ">Topik Live Sesi</p>
                        <button className="btn p-0 d-sm-none" onClick={tutupList}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg text-dark" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                          </svg>
                        </button>
                      </div>
                      <div class=" d-flex flex-column flex-lg-row align-items-center justify-content-center">
                        <img src={dataMasuk.kategori === "mm" ? mm : dataMasuk.kategori === "jarkom" ? jarkom : rpl} alt="" className="img-fluid topik me-3" />
                        <p className="judul-1 text-cyan text-center text-lg-start tema">
                          Tema : <br /> {dataMasuk.kategori === "mm" ? "Multimedia" : dataMasuk.kategori === "jarkom" ? "Jaringan Komputer" : "Rekayasa Perangkat Lunak"}
                        </p>
                      </div>
                    </div>
                    <div class="list-friends">
                      <p className="judul-1 mb-2">Daftar Anggota</p>
                      <div class="items-friends">
                        <div class="item-friends" key={userData.iduser}>
                          <div class="d-flex align-items-center">
                            <div class="image me-lg-3 me-1">
                              <img src="" alt="" />
                            </div>
                            <div class="friend">
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
            )}
          </>
        )}
        <ModalElement show={show} funcModal={handleClose} heading={"Surat Spesial"}>
          <div className="text-center">
            <img src={Signup} alt="" />
            <p className="w-75 mx-auto mt-3" style={{ fontSize: "13px" }}>
              Yeayyy! Kamu ketemu temen baru nih, Ngobrolnya yang baik-baik yaa
            </p>
            <Button isPrimary className="w-100  fs-6" onClick={handleClose}>
              Terimakasih Mimin Saika
            </Button>
          </div>
        </ModalElement>
      </div>
    </section>
  );
}
