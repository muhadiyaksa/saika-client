import React, { useState } from "react";
import Button from "../element/Button";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Regist() {
  const [show, setShow] = useState("password");
  const [show2, setShow2] = useState("password");
  const [dataUser, setDataUser] = useState({});
  const [errors, setErrors] = useState([]);
  const [isSpinner, setIsSpinner] = useState(false);
  const showhideclick = () => {
    show === "password" ? setShow("text") : setShow("password");
  };
  const showhideclick2 = () => {
    show2 === "password" ? setShow2("text") : setShow2("password");
  };
  const navigate = useNavigate();

  const submitRegist = () => {
    setIsSpinner(true);
    Axios({
      method: "POST",
      data: dataUser,
      withCredentials: true,
      url: "http://localhost:3001/register",
    }).then((res) => {
      if (!res.data.errors) {
        navigate("/login");
        console.log(res);
        return "Success";
      } else {
        let error = res.data.errors.map((el) => el.msg);
        setErrors([...error]);
      }
    });
  };
  return (
    <section className="regist">
      <div className="bg d-none d-md-block"></div>
      <div className="container ">
        <div className="row align-items-xxl-center">
          <div className="col-md  d-none d-md-block ">
            <img src="/image/signup.svg" style={{ marginTop: "80px" }} />
          </div>
          <div className="col-md p-4">
            <div className="regist-only  ">
              <p className="judul mb-0">Registrasi</p>
              <p className="keterangan ">Isi Form dan Nikmati akses penuh aplikasi SAIKA</p>

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
              <div className={`alert alert-danger pb-0 ${errors.length === 0 ? "d-none" : ""}`} role="alert" style={{ fontSize: "13px" }}>
                <ul>
                  {errors.map((el, i) => {
                    return <li key={`error-${i}`}>{el}</li>;
                  })}
                </ul>
              </div>
              <Button isPrimary isSpinner={isSpinner} className="w-100 rounded-3 mb-4 d-inline-flex align-items-center justify-content-center" onClick={submitRegist}>
                Daftar
              </Button>

              <p className="text-center" style={{ fontSize: "14px" }}>
                Sudah punya akun SAIKA?{" "}
                <Button type="link" href="/login" className="daftar text-cream">
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
