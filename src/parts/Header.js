import React, { useState, useEffect, useRef } from "react";
import Button from "../element/Button";
import IconNotif from "../assets/icon/notif.png";
import avaUser from "../assets/icon/ava_user.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userSlice";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import ModalElement from "../element/ModalElement";

export default function Header() {
  const userObj = JSON.parse(localStorage.getItem("userSaika"));
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userData = useSelector((state) => state.user.user);

  const [dataUser, setDataUser] = useState({});

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  useEffect(() => {
    fetchtoAPI();
  }, []);

  const fetchtoAPI = async () => {
    if (isLoggedIn) {
      const dataIDUser = new Promise((fulfill, reject) => {
        if (userData._id) {
          return fulfill(userData._id);
        }
      });

      dataIDUser.then((res) => {
        Axios({
          method: "GET",
          withCredentials: true,
          url: `http://localhost:3001/user/${res}`,
          headers: {
            Authorization: `Bearer ${userObj.token}`,
          },
        }).then((result) => {
          setDataUser(result.data);
        });
      });
    }
  };

  const [show, setShow] = useState(false);
  const handleCloseNotif = () => setShow(false);
  const handleShowNotif = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleCloseNotif2 = () => setShow2(false);
  const handleShowNotif2 = () => setShow2(true);
  let refInputFile = useRef(null);

  const showUser = () => {
    if (isLoggedIn) {
      return (
        <>
          <Button className="btn border rounded-circle p-0" type="link" href="/user">
            <img src={dataUser.fotoUser ? `${dataUser.fotoUser.fotoUrl === "" ? avaUser : dataUser.fotoUser.fotoUrl}` : `${avaUser}`} alt="User" />
          </Button>
          <div className="hover-item text-start ">
            <ul className="list-group">
              <li className="list-group-item">
                <p className="fw-bold text-nowrap text-capitalize">{dataUser.nama}</p>
                <span>{dataUser.email}</span>
              </li>
              <li className="list-group-item">
                <Button className="btn d-inline-flex w-100 align-items-center" onClick={handleShowNotif}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle me-2" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                  </svg>
                  <span>Ubah Profile</span>
                </Button>
                <Button className="btn d-inline-flex w-100 align-items-center" onClick={handleShowNotif2}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill me-2" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                  </svg>
                  <span>Ubah Password</span>
                </Button>
                <Button className="btn d-inline-flex w-100 align-items-center logout" onClick={handleLogout}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right me-2" viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                    />
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                  </svg>
                  <span>Logout</span>
                </Button>
              </li>
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <Button className="btn login btn-light py-1 px-2 " type="link" href="/login">
          Login
        </Button>
      );
    }
  };
  return (
    <nav className="navbar navbar-expand-sm">
      <div className="container">
        <Button type="link" className="navbar-brand text-center " href="/">
          <span className="judul">SAIKA</span>
          <br />
          <span className="d-none d-md-block fw-light">Sahabat Informatika</span>
        </Button>
        <div className="navbar-account ms-auto d-sm-none">
          <Button type="link" href="/user" className="position-relative">
            <img src={IconNotif} className="icon-notif" />
            <div className="notif"></div>
          </Button>
          <Button className="btn border ava-user rounded-circle p-0" type="link" href="/user">
            <img src={dataUser.fotoUser ? `${dataUser.fotoUser.fotoUrl === "" ? avaUser : dataUser.fotoUser.fotoUrl}` : `${avaUser}`} alt="User" />
          </Button>
        </div>
        <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-list text-white fw-bold" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-lg-0 flex-sm-row  d-flex ">
            <li className="nav-item ">
              <Button type="link" className="nav-link active" aria-current="page" href="/">
                Beranda
              </Button>
            </li>
            <li className="nav-item">
              <Button type="link" className="nav-link text-white" href="/search">
                Acara
              </Button>
            </li>
            <li className="nav-item">
              <Button type="link" className="nav-link text-white" href="/friends">
                Teman
              </Button>
            </li>
          </ul>
          <div className="navbar-account ms-auto d-none d-sm-flex ">
            <Button type="link" href="" className="position-relative">
              <img src={IconNotif} />
              <div className="notif"></div>
            </Button>

            <div className=" text-end user mx-xl-3 mx-lg-2 mx-md-1 mx-sm-3 mx-2 d-inline-block">{showUser()}</div>
          </div>
        </div>
      </div>
      <ModalElement show={show} funcModal={handleCloseNotif} heading={"Ubah Profile"}>
        <div className="image-profile">
          <div className="image">
            <img src={dataUser.fotoUser ? `${dataUser.fotoUser.fotoUrl === "" ? avaUser : dataUser.fotoUser.fotoUrl}` : `${avaUser}`} alt="User" />
          </div>
          <input type="file" className="d-none" ref={refInputFile} />
          <Button className="btn " onClick={() => refInputFile.current.click()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-camera-fill text-cyan" viewBox="0 0 16 16">
              <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
            </svg>
          </Button>
        </div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" className="form-control shadow-none mb-3" placeholder="username" defaultValue={dataUser.username} />
        <label htmlFor="name">Nama Lengkap</label>
        <input id="nama" type="text" className="form-control shadow-none mb-3" placeholder="Nama Lengkap" defaultValue={dataUser.nama} />
        <Button isPrimary className="w-100  fs-6" onClick={handleCloseNotif}>
          Simpan
        </Button>
      </ModalElement>
      <ModalElement show={show2} funcModal={handleCloseNotif2} heading={"Ubah Password"}>
        <label htmlFor="lama">Password Lama</label>
        <input id="lama" type="password" className="form-control shadow-none mb-3" placeholder="Isi Password lama" />
        <label htmlFor="baru">Password Baru</label>
        <input id="baru" type="password" className="form-control shadow-none mb-3" placeholder="Isi Password Baru" />
        <label htmlFor="konfirmbaru">Konfirmasi Password Baru</label>
        <input id="konfirmbaru" type="password" className="form-control shadow-none mb-3" placeholder="Isi Konfirmasi Password" />
        <Button isPrimary className="w-100  fs-6" onClick={handleCloseNotif}>
          Simpan
        </Button>
      </ModalElement>
    </nav>
  );
}
