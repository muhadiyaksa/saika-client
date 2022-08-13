import React, { useState } from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import Button from "../element/Button";
import ChatSend from "../assets/icon/send.png";
import Message from "../assets/image/message.png";
import Axios from "axios";
import io from "socket.io-client";
import { useSelector } from "react-redux";

export default function PersonalChat() {
  const socket = io.connect("http://localhost:3001");
  const userObj = JSON.parse(localStorage.getItem("userSaika"));
  const userData = useSelector((state) => state.user.user);
  const [dataChat, setDataChat] = useState({});
  const [geser, setGeser] = useState(false);
  const [showList, setShowList] = useState(false);

  const showChats = (e) => {
    setGeser(true);

    //jalankan axios panggil dataChat
    Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3001/chat/${e.target.getAttribute("idchat")}`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    }).then((res) => {
      console.log(res);
    });
  };
  const hiddenChats = () => {
    setGeser(false);
  };

  const showHideListFriends = () => {
    if (showList === false) {
      let data1 = [];
      if (data1.length > 0) {
        let data = data1.map((el) => {
          return (
            <div className="item-friends d-flex align-items-center">
              <div class="d-flex align-items-center">
                <div className="image me-lg-3 me-1">
                  <img src="" alt="" />
                </div>
                <div className="friend">
                  <p className="p-0 m-0">Abdul Fatah</p>
                  <Button type="link" href="/">
                    @fatah
                  </Button>
                </div>
              </div>
              <div class="info">
                <button className="btn p-0" onClick={showChats}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-envelope-fill text-cyan" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                  </svg>
                </button>
                <span className="red"></span>
              </div>
            </div>
          );
        });
        return data;
      } else {
        return (
          <div className="pt-5 d-flex align-items-center justify-content-center">
            <p>Kamu belum Memiliki Teman</p>;
          </div>
        );
      }
    } else {
      return (
        <div className="item-friends d-flex align-items-center">
          <div class="d-flex align-items-center">
            <div className="image me-lg-3 me-1">
              <img src="" alt="" />
            </div>
            <div className="friend">
              <p className="p-0 m-0">Abdul Fatah</p>
              <Button type="link" href="/">
                @fatah
              </Button>
            </div>
          </div>
          <div class="action">
            <button className="btn tolak d-sm-none d-lg-inline-block">tolak</button>
            <button className="btn terima d-sm-none d-lg-inline-block">Terima</button>
            <button className="btn p-0 d-none d-sm-inline-block d-lg-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-check-circle-fill text-cyan" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            </button>
            <button className="btn p-0 d-none d-sm-inline-block d-lg-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
      );
    }
  };
  return (
    <>
      <section class="personalchat">
        <Header />
        <div class="container">
          <div className={`friends ${geser === true ? "geser" : ""}`}>
            <div class="navigasi-friends">
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
            <div class="d-flex align-items-center justify-content-center banner flex-column">
              <img src={Message} alt="" />
              <p>Mulailah Berkomunikasi secara Personal kepada teman-teman Mu di SAIKA</p>
            </div>
            <div className="position-relative h-100">
              <div className="row header-chats align-items-center">
                <div className="col d-flex align-items-center">
                  <button className="btn p-0 me-3 d-sm-none" onClick={hiddenChats}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left-circle text-cyan" viewBox="0 0 16 16">
                      <path
                        fill-rule="evenodd"
                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                      />
                    </svg>
                  </button>
                  <div class="image">
                    <img src="" alt="" />
                  </div>
                  <div class="identitas">
                    <p className="p-0 m-0">Muhamad Adi Yaksa</p>
                    <span>@muhadiyaksa</span>
                  </div>
                </div>
              </div>
              <div className="list-chats">
                <div className="position-relative h-100 w-100 ">
                  <div className="chat-value ">
                    <div className="chat-item me">
                      <p className="value">Test</p>
                      <p className="jam me">ya</p>
                    </div>
                    <div className="chat-item">
                      <p className="value">Apa nih</p>
                      <p className="jam">19:00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="input-chats">
                <div className="position-relative">
                  <input type="text" className="form-control input-pesan" placeholder="ketikan pesanmu disini" />
                  <Button className="btn">
                    <img src={ChatSend} alt="Send" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="d-none d-sm-block">
        <Footer />
      </div>
    </>
  );
}
