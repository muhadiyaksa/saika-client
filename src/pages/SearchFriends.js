import React, { useState, useEffect } from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import Button from "../element/Button";
import { useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

import ModalElement from "../element/ModalElement";

export default function SearchFriends({ socket }) {
  const userObj = JSON.parse(localStorage.getItem("userSaika"));

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userData = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState({});
  const [dataKategori, setDataKategori] = useState("");
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
    if (isLoggedIn) {
      getDataUser();
    }
  }, []);

  const [warningLogin, setWarningLogin] = useState(false);
  const handleCloseWarningLogin = () => {
    setWarningLogin(false);
  };
  const hitDatabase = (tipe, kategori) => {
    let data = {};
    let iduseranonymous;
    if (!sessionStorage.getItem("iduseranonymous")) sessionStorage.setItem("iduseranonymous", `anonymous${Math.floor(Math.random() * 1000000000)}`);

    iduseranonymous = sessionStorage.getItem("iduseranonymous");

    if (tipe === "registered") {
      data = {
        kategori,
        tipeUser: "registered",
        iduser: userData._id,
        fotoUser: "",
        namauser: dataUser.nama,
        usernameuser: dataUser.username ? dataUser.username : "@anonymous",
        percobaan: 0,
      };
    } else {
      data = {
        kategori,
        iduser: iduseranonymous,
        tipeUser: "unregistered",
        percobaan: 0,
      };
    }

    Axios({
      method: "POST",
      data,
      withCredentials: true,
      url: `http://localhost:3001/chats`,
      // headers: {
      //   Authorization: `Bearer ${userObj.token}`,
      // },
    }).then((res) => {
      console.log(res.data);
      if (res.data.status === "waiting") {
        navigate(`/waiting?kategori=${kategori}`);
      }
    });
  };
  const findFriends = (param) => {
    if (isLoggedIn) {
      hitDatabase("registered", param);
    } else {
      setDataKategori(param);
      setWarningLogin(true);
    }
  };

  const nextAsAnonymous = () => {
    hitDatabase("unregistered", dataKategori);
  };
  return (
    <>
      <Header socket={socket} />
      <section className="findfriend py-5">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p className="judul-1 text-cream">Pilihan Teman Informatika</p>
              <p className="judul-2">Berikut Tema yang Disediakan </p>
              <div className="keterangan-1 text-white">
                <p>Pilih salahsatu dari 3 tema berikut ini untuk menemukan teman Informatikamu yang sesuai</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md">
              <div className="tema text-center   py-4 mb-3">
                <div className="row align-items-center ">
                  <div className="col col-md-auto  image text-end ms-auto text-md-center">
                    <img src="/image/multimedia.svg" alt="Multimedia" />
                  </div>
                  <div className="col col-md-auto text-start mx-md-auto text-md-center">
                    <p className="mb-0 text-cream">Multimedia</p>
                    <Button className="ms-0" isPrimary onClick={() => findFriends("mm")}>
                      Cari Teman
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="tema text-center   py-4 mb-3">
                <div className="row align-items-center ">
                  <div className="col col-md-auto  image text-end ms-auto text-md-center">
                    <img src="/image/rpl.svg" alt="Rekayasa Perangkat Lunak" />
                  </div>
                  <div className="col col-md-auto text-start mx-md-auto text-md-center">
                    <p className="text-cream mb-0">Rekayasa Perangkat Lunak</p>
                    <Button className="ms-0" isPrimary onClick={() => findFriends("rpl")}>
                      Cari Teman
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="tema text-center   py-4 mb-3">
                <div className="row align-items-center">
                  <div className="col col-md-auto  image text-end ms-auto text-md-center">
                    <img src="/image/jaringan.svg" alt="Jaringan Komputer" />
                  </div>
                  <div className="col col-md-auto text-start mx-md-auto text-md-center">
                    <p className="mb-0 text-cream">Jaringan Komputer</p>
                    <Button className="ms-0" isPrimary onClick={() => findFriends("jarkom")}>
                      Cari Teman
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ModalElement isDongker show={warningLogin} isCentered={true} funcModal={handleCloseWarningLogin}>
        <div className="p-4  position-relative d-flex flex-column align-items-center">
          <Button className="btn fw-bold shadow-none p-0 text-cream d-block ms-auto position-absolute" onClick={handleCloseWarningLogin} style={{ fontSize: "14px", top: "10px", right: "10px" }}>
            x
          </Button>
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-exclamation d-block text-danger mx-auto mb-3" viewBox="0 0 16 16">
            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5Zm0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
          </svg>
          <p className="text-softwhite fw-light" style={{ fontSize: "13px", textAlign: "center" }}>
            Kamu Belum terdaftar sebagai Teman SAIKA, jika ingin melanjutkan maka kamu akan dianggap sebagai anonymous dan spam dalam Group
          </p>

          <Button isPrimary className="py-2 px-3   my-3 text-decoration-none rounded d-inline-flex align-items-center justify-content-center" type="link" href="/login" style={{ width: "120px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right me-2" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
              />
              <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
            </svg>
            Login
          </Button>

          <Button isSecondary className="btn p-0 shadow-none text-decoration-underline text-cream d-block" style={{ fontSize: "12px" }} onClick={nextAsAnonymous}>
            Lanjutkan
          </Button>
        </div>
      </ModalElement>
    </>
  );
}
