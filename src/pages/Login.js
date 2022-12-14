import React, { useState } from "react";
import BannerLogin from "../assets/image/Login 1.svg";
import Button from "../element/Button";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
export default function Login() {
  const [show, setShow] = useState("password");
  const [errors, setErrors] = useState([]);
  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const showhideclick = () => {
    show === "password" ? setShow("text") : setShow("password");
  };
  const dispatch = useDispatch();

  const submitLogin = () => {
    Axios({
      method: "POST",
      data: dataLogin,
      withCredentials: true,
      url: "http://localhost:3001/login",
    }).then(async (res) => {
      // console.log(res.data);
      if (!res.data.message) {
        const actionResult = await dispatch(login(res.data));
        const result = unwrapResult(actionResult);
        if (result) {
          window.location.reload();
        }
      } else {
        setErrors(res.data.message);
      }
    });
  };
  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <section className="login">
          <div className="bg d-none d-md-block"></div>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md  d-none d-md-block ">
                <img src="/image/login.svg" />
              </div>
              <div className="col-md p-4 ">
                <div>
                  <p className="judul">Selamat Datang!!</p>
                  <p className="keterangan mb-5">Masuk untuk mulai mencari teman Informatika Mu</p>

                  <label htmlFor="email">Email</label>
                  <br />
                  <input type="text" id="email" name="email" placeholder="Email" onChange={(e) => setDataLogin({ ...dataLogin, email: e.target.value })} />
                  <br />
                  <label htmlFor="lname">Password</label>
                  <br />
                  <input type={show} id="password" name="password" placeholder="Password" onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })} />
                  <span className="show-hide" onClick={showhideclick}></span>
                  <div class="d-flex justify-content-between align-items-center mb-0 ">
                    <div class="form-check " style={{ fontSize: "12px" }}>
                      <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                      <span class="form-check-label" for="flexCheckChecked">
                        Ingat Saya
                      </span>
                    </div>
                    <Button type="link" href="/forget" className="text-white" style={{ fontSize: "12px" }}>
                      Lupa Password?
                    </Button>
                  </div>

                  <br />
                  <div className={`alert alert-danger pb-0 mb-4 ${errors.length === 0 ? "d-none" : ""}`} role="alert" style={{ fontSize: "13px" }}>
                    <p>{errors}</p>
                  </div>
                  <Button isPrimary className="w-100 rounded-3 mb-3" onClick={submitLogin}>
                    Login
                  </Button>

                  <p className="text-center">
                    Belum punya akun Saika?{" "}
                    <Button type="link" href="/regist" className="daftar text-cream">
                      Daftar Sekarang
                    </Button>
                  </p>
                  <p className="text-center">
                    <Button type="link" href="/" className="daftar text-white">
                      Kembali
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
