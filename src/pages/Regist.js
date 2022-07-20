import React, { useState } from "react";
import Button from "../element/Button";
import SignupBanner from "../assets/image/Signup.svg";
export default function Regist() {
  const [show, setShow] = useState("password");
  const [show2, setShow2] = useState("password");
  const [dataUser, setDataUser] = useState({});

  const showhideclick = () => {
    show === "password" ? setShow("text") : setShow("password");
  };
  const showhideclick2 = () => {
    show2 === "password" ? setShow2("text") : setShow2("password");
  };

  const submitRegist = () => {
    console.log(dataUser);
  };
  return (
    <section className="regist">
      <div className="bg d-none d-md-block"></div>
      <div className="container">
        <div className="row">
          <div className="col-md d-flex align-items-center justify-content-center d-none d-md-block">
            <img src={SignupBanner} className="mt-5" />
          </div>
          <div className="col-md p-4">
            <div>
              <p className="judul">Hello! Welcome to Saika</p>
              <p className="keterangan">Register now and start to feel the excitement of study jamming with your matched buddy</p>

              <label htmlFor="namaLengkap">Nama Lengkap</label>

              <input type="text" id="namaLengkap" name="namaLengkap" placeholder="Nama Lengkap" onChange={(e) => setDataUser({ ...dataUser, nama: e.target.value })} />
              <br />
              <label htmlFor="username">Username</label>

              <input type="text" id="username" name="username" placeholder="Username" onChange={(e) => setDataUser({ ...dataUser, username: e.target.value })} />
              <br />
              <label htmlFor="email">Email</label>

              <input type="text" id="email" name="email" placeholder="Email" onChange={(e) => setDataUser({ ...dataUser, email: e.target.value })} />
              <br />
              <label htmlFor="lname">Password</label>

              <input type={show} id="password" name="password" placeholder="Password" onChange={(e) => setDataUser({ ...dataUser, password: e.target.value })} />
              <span className="show-hide" onClick={showhideclick}></span>
              <br />
              <label htmlFor="confirmPassword">Konfirmasi Password</label>

              <input type={show2} id="confirmPassword" name="confirmPassword" placeholder="Konfirmasi Password" onChange={(e) => setDataUser({ ...dataUser, konfirmPassword: e.target.value })} />
              <span className="show-hide" onClick={showhideclick2}></span>
              <br />
              <br />
              <Button isPrimary className="w-100 rounded-3 mb-4" onClick={submitRegist}>
                Daftar
              </Button>

              <p className="text-center">
                Sudah punya akun SAIKA?{" "}
                <Button type="link" href="/login" className="daftar">
                  Login Disini
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
