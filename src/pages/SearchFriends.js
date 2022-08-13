import React, { useState, useEffect } from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import rpl from "../assets/image/rpl.png";
import mm from "../assets/image/multimedia.png";
import jarkom from "../assets/image/jarkom.png";
import Button from "../element/Button";
import { useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

export default function SearchFriends() {
  const socket = io.connect("http://localhost:3001");

  const userObj = JSON.parse(localStorage.getItem("userSaika"));

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userData = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState({});

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
  }, []);

  const findFriends = (param) => {
    Axios({
      method: "POST",
      data: {
        kategori: param,
        iduser: userData._id,
        fotoUser: "",
        namauser: dataUser.nama,
        usernameuser: dataUser.username ? dataUser.username : "@anonymous",
        percobaan: 0,
      },
      withCredentials: true,
      url: `http://localhost:3001/chats`,
      headers: {
        Authorization: `Bearer ${userObj.token}`,
      },
    }).then((res) => {
      if (res.data.status === "waiting") {
        navigate(`/waiting?kategori=${param}`);
      }
    });
  };
  return (
    <>
      <Header />
      <section className="findfriend py-5">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p className="judul-1 text-cyan">Pilihan Teman Informatika</p>
              <p className="judul-2">Berikut Tema yang Disediakan </p>
              <div className="keterangan-1">
                <p>Pilihlah satu dari 3 tema berikut ini untuk menemukan teman Informatikamu yang sesuai</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md">
              <div className="tema text-center shadow  py-4 mb-3">
                <p className="judul-1 text-cyan">Multimedia</p>
                <img src={mm} alt="Multimedia" />
                <Button isPrimary isAnimation onClick={() => findFriends("mm")}>
                  Cari Teman
                </Button>
              </div>
            </div>
            <div className="col-md">
              <div className="tema text-center shadow  py-4 mb-3">
                <p className="judul-1 text-cyan">Rekayasa Perangkat Lunak</p>
                <img src={rpl} alt="Rekayasa Perangkat Lunak" />
                <Button isPrimary isAnimation onClick={() => findFriends("rpl")}>
                  Cari Teman
                </Button>
              </div>
            </div>
            <div className="col-md">
              <div className="tema text-center shadow  py-4 mb-3">
                <p className="judul-1 text-cyan">Jaringan Komputer</p>
                <img src={jarkom} alt="Jaringan Komputer" />
                <Button isPrimary isAnimation onClick={() => findFriends("jarkom")}>
                  Cari Teman
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
