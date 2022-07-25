import React, { useState, useEffect } from "react";
import mm from "../assets/image/multimedia.png";
import Button from "../element/Button";
import ChatSend from "../assets/icon/send.png";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Axios from "axios";
const socket = io.connect("http://localhost:3001");

export default function Chats() {
  const userObj = JSON.parse(localStorage.getItem("userSaika"));
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userData = useSelector((state) => state.user.user);
  const param = useParams();
  const geserList = () => {
    const listChats = document.querySelector(".chats .friends");
    listChats.classList.toggle("geser");
  };
  const tutupList = () => {
    const listChats = document.querySelector(".chats .friends");
    listChats.classList.toggle("geser");
  };

  const [dataMasuk, setdataMasuk] = useState({});
  const [pesanKirim, setPesanKirim] = useState("");

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
          socket.emit("join_room", param);
          setdataMasuk(result.data);
        }
      });
    };
    getDataRoom();
  }, []);

  const dataKirim = {
    idroom: param.idroom,
    iduser: userData._id,
    pesanKirim: pesanKirim,
  };

  const sendMessage = () => {
    socket.emit("send_message", dataKirim);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setdataMasuk(data);
    });
  }, [socket]);

  const tampilTeman = () => {
    if (dataMasuk.anggota !== undefined) {
      let data = dataMasuk.anggota.map((el) => {
        return (
          <div class="item-friends" key={el.iduser}>
            <div class="d-flex align-items-center">
              <div class="image me-lg-3 me-1">
                <img src="" alt="" />
              </div>
              <div class="friend">
                <p className="p-0 m-0">{el.iduser === userData._id ? "Saya" : ""}</p>
                <Button type="link" href="/">
                  {el.usernameuser}
                </Button>
              </div>
            </div>
            <div class="add">
              {el.iduser === userData._id ? (
                ""
              ) : (
                <Button className="btn btn-outline-cyan ">
                  + <span className="d-none d-lg-inline-block">Teman</span>
                </Button>
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
              <p className="user">{el.usernameuser}</p>
              <p className="value">{el.pesan}</p>
              <p className="jam">{el.waktu}</p>
            </div>
          );
        }
      });
      return data;
    }
  };
  return (
    <section className="chats">
      <div class="container">
        <div class="box">
          <div class="position-relative h-100">
            <div class="row header-chats align-items-center">
              <div class="col d-flex align-items-center">
                <span class="red"></span>
                <span>Live Sedang Berlangsung</span>
              </div>
              <div class="col text-end">
                <button className="btn btn-outline-danger me-3 me-sm-0">Akhiri Sesi</button>
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
                <input type="text" className="form-control" placeholder="ketikan pesanmu disini" onChange={(e) => setPesanKirim(e.target.value)} />
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
                <img src={mm} alt="" className="img-fluid topik me-3" />
                <p className="judul-1 text-cyan text-center text-lg-start tema">
                  Tema : <br /> Multimedia
                </p>
              </div>
            </div>
            <div class="list-friends">
              <p className="judul-1 mb-2">Daftar Anggota</p>
              <div class="items-friends">{tampilTeman()}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
