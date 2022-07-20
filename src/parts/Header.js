import React from "react";
import Button from "../element/Button";
import IconNotif from "../assets/icon/notif.png";
import avaUser from "../assets/icon/ava_user.jpg";

export default function Header() {
  const isLoggedIn = false;
  const dataUser = {
    nama: "Muhamad Adi yaksa",
    email: "muhadiyaksa@gmail.com",

    fotoUser: {
      fotoUrl: "",
      fotoNama: "",
    },
  };
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
                <Button className="btn d-inline-flex w-100 align-items-center">
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
        <Button type="link" className="navbar-brand text-center " href="#">
          <span className="judul">SAIKA</span>
          <br />
          <span className="d-none d-md-block fw-light">Sahabat Informatika</span>
        </Button>
        <div className="navbar-account ms-auto d-sm-none">
          <Button type="link" href="" className="position-relative">
            <img src={IconNotif} className="icon-notif" />
            <div class="notif"></div>
          </Button>
          <Button className="btn border ava-user rounded-circle p-0" type="link" href="/user">
            <img src={dataUser.fotoUser ? `${dataUser.fotoUser.fotoUrl === "" ? avaUser : dataUser.fotoUser.fotoUrl}` : `${avaUser}`} alt="User" />
          </Button>
        </div>
        <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-list text-white fw-bold" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
          </svg>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-lg-0 flex-sm-row  d-flex ">
            <li className="nav-item ">
              <Button type="link" className="nav-link active" aria-current="page" href="#">
                Beranda
              </Button>
            </li>
            <li className="nav-item">
              <Button type="link" className="nav-link text-white" href="#">
                Acara
              </Button>
            </li>
            <li className="nav-item">
              <Button type="link" className="nav-link text-white" href="#">
                Teman
              </Button>
            </li>
          </ul>
          <div className="navbar-account ms-auto d-none d-sm-block">
            <Button type="link" href="" className="position-relative">
              <img src={IconNotif} />
              <div class="notif"></div>
            </Button>

            <div className=" text-end user mx-xl-3 mx-lg-2 mx-md-1 mx-sm-3 mx-2 d-inline-block">{showUser()}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}