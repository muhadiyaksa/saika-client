import React, { useState } from "react";
import BannerLogin from "../assets/image/Login 1.svg";
import Button from "../element/Button";
import Axios from "axios";
export default function Login() {
  const [show, setShow] = useState("password");
  const [errors, setErrors] = useState([]);
  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });

  const showhideclick = () => {
    show === "password" ? setShow("text") : setShow("password");
  };

  const submitLogin = () => {
    console.log(dataLogin);
    // Axios({
    //   method: "POST",
    //   data: dataLogin,
    //   withCredentials: true,
    //   url: "https://serverpasarikantawar.herokuapp.com/login",
    // }).then(async (res) => {
    //   console.log(res);
    //   // if (!res.data.message) {
    //   //   const actionResult = await dispatch(login(res.data));
    //   //   const result = unwrapResult(actionResult);
    //   //   if (result) {
    //   //     window.location.reload();
    //   //   }
    //   // } else {
    //   //   setErrors(res.data.message);
    //   // }
    // });
  };
  return (
    <section className="login">
      <div className="bg d-none d-md-block"></div>
      <div className="container">
        <div className="row">
          <div className="col-md d-flex align-items-center justify-content-center d-none d-md-block ">
            <img src={BannerLogin} className="mt-5" />
          </div>
          <div className="col-md p-4 ">
            <div>
              <p className="judul">Selamat Datang!!</p>
              <p className="keterangan">Masuk untuk mulai mencari teman Saikamu sekarang juga</p>

              <label htmlFor="email">Email</label>
              <br />
              <input type="text" id="email" name="email" placeholder="Email" onChange={(e) => setDataLogin({ ...dataLogin, email: e.target.value })} />
              <br />
              <label htmlFor="lname">Password</label>
              <br />
              <input type={show} id="password" name="password" placeholder="Password" onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })} />
              <span className="show-hide" onClick={showhideclick}></span>
              <br />
              <br />
              <div className={`alert alert-danger pb-0 mb-0 ${errors.length === 0 ? "d-none" : ""}`} role="alert" style={{ fontSize: "13px" }}>
                <p>{errors}</p>
              </div>
              <Button isPrimary className="w-100 rounded-3 mb-3" onClick={submitLogin}>
                Login
              </Button>

              <p className="text-center">
                Belum punya akun Saika?{" "}
                <Button type="link" href="/regist" className="daftar">
                  Daftar Sekarang
                </Button>
              </p>
              <p className="text-center">
                <Button type="link" href="/" className="daftar ">
                  Kembali
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
