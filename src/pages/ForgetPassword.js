import Axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../element/Button";
import ModalElement from "../element/ModalElement";

export default function ForgetPassword() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  // const userObj = JSON.parse(localStorage.getItem("userSaika"));
  const [dataLupaPassword, setDataLupaPassword] = useState({});
  const [errors, setErrors] = useState({ errValidateEmail: [], errValidateCode: [], errValidatePassword: [] });
  const [count, setCount] = useState(60);
  const [disable, setDisable] = useState(false);
  const [show, setshow] = useState({ formEmail: true, formCode: false });
  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const sendUniqueCode = () => {
    setshow({ formEmail: false, formCode: true });
    setDisable(true);
    let y = 60;
    let x = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
      y--;
      if (y < 1) {
        setDisable(false);
        setDisableButton(false);

        setCount(60);
        clearInterval(x);
      }
    }, 1000);
  };
  const showButtonResendCode = () => {
    setshow({ formEmail: true, formCode: false });
  };

  const [disableValidate, setDisableValidate] = useState(true);

  const focusSet = (e) => {
    const inputCode = document.querySelectorAll(".forget .code-form input");
    let indeks = e.target.getAttribute("indeks");
    let dataValue = [];
    if (e.target.value) {
      if (e.target.value === " ") {
        inputCode[+indeks - 1].value = null;
      } else {
        dataValue.unshift(e.target.value);
        if (+indeks === 6) {
          inputCode[+indeks - 1].focus();
        } else {
          inputCode[+indeks].focus();
        }
      }
    }

    if (!e.target.value[0]) {
      if (+indeks - 2 >= 0) {
        inputCode[+indeks - 2].focus();
      }
    }

    let inputValue = [...inputCode];
    let data = inputValue.filter((el) => el.value === "" || !el.value);
    let kodeValue = inputValue.map((el) => el.value);
    if (data.length > 0) {
      setDisableValidate(true);
    } else {
      setDisableValidate(false);
      setDataLupaPassword({ ...dataLupaPassword, kodeunik: kodeValue.join("").toUpperCase() });
    }
  };

  const validateEmail = () => {
    setIsLoading(true);
    setDisableButton(true);
    Axios({
      method: "PUT",
      data: {
        email: dataLupaPassword.email,
      },
      withCredentials: true,
      url: "http://localhost:3001/user/senduniquecode",
    }).then((res) => {
      if (!res.data.errors) {
        setIsLoading(false);
        sendUniqueCode();
        setErrors({ ...errors, errValidateEmail: [] });
        return "Success";
      } else {
        let error = res.data.errors.map((el) => el.msg);
        setIsLoading(false);
        setErrors({ ...errors, errValidateEmail: [...error] });
        setDisableButton(false);
      }
    });
  };

  const [showBoxResetPassword, setShowBoxResetPassword] = useState(false);
  const [showBoxNotifSuccess, setShowBoxNotifSuccess] = useState(false);
  const [spinnerPassword, setSpinnerPassword] = useState(false);
  const [spinnerUniqueCode, setSpinnerUniqueCode] = useState(false);

  const validateUniqueCode = () => {
    setSpinnerUniqueCode(true);
    Axios({
      method: "PUT",
      data: {
        email: dataLupaPassword.email,
        kodeunik: dataLupaPassword.kodeunik,
      },
      withCredentials: true,
      url: "http://localhost:3001/user/validateuniquecode",
    }).then((res) => {
      setSpinnerUniqueCode(false);
      if (!res.data.errors) {
        setShowBoxResetPassword(true);
        setErrors({ ...errors, errValidateCode: [] });
        return "Success";
      } else {
        let error = res.data.errors.map((el) => el.msg);
        setErrors({ ...errors, errValidateCode: [...error] });
      }
    });
  };

  const handleCloseBoxReset = () => {
    setShowBoxResetPassword(false);
  };

  const updateNewPassword = () => {
    setSpinnerPassword(true);
    Axios({
      method: "PUT",
      data: {
        email: dataLupaPassword.email,
        passwordNew: dataLupaPassword.newPassword,
        passwordConfirm: dataLupaPassword.confirmNewPassword,
        kodeunik: dataLupaPassword.kodeunik,
        // kodeunik: null,
      },
      withCredentials: true,
      url: "http://localhost:3001/user/resetpassword",
    }).then((res) => {
      setSpinnerPassword(false);
      if (!res.data.errors) {
        setShowBoxNotifSuccess(true);
        setShowBoxResetPassword(false);
        setErrors({ ...errors, errValidateCode: [] });
      } else {
        let error = res.data.errors.map((el) => el.msg);
        setErrors({ ...errors, errValidatePassword: [...error] });
      }
    });
  };

  const handleCloseNotifSuccess = () => {
    setShowBoxNotifSuccess(false);
    navigate("/login");
  };
  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <section className="forget">
          <div className="bg d-none d-md-block"></div>

          <div className="container">
            <div className="row ">
              <div className="col-md  d-none d-md-block py-4">
                <img src="/image/forgot.svg" />
              </div>
              <div className="col-md p-4 ">
                <div className="forget-only">
                  <p className="judul">Lupa Password?</p>
                  <p className="keterangan mb-5">tenang kamu dapat mereset lalu mengganti password mu!</p>
                  <span style={{ fontSize: "13px" }} className={`alert alert-success w-100 text-center ${show.formCode ? "d-inline-block" : "d-none"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-check-square me-3" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                      <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                    </svg>
                    Kode telah dikirimkan ke email tersebut
                  </span>
                  <div className={`${show.formEmail ? "" : "d-none"}`}>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input type="text" id="email" name="email" placeholder="Email" onChange={(e) => setDataLupaPassword({ ...dataLupaPassword, email: e.target.value })} />
                    <br />

                    <div className={`alert alert-danger pb-0 ${errors.errValidateEmail.length === 0 ? "d-none" : ""}`} role="alert" style={{ fontSize: "13px" }}>
                      <ul>
                        {errors.errValidateEmail.map((el, i) => {
                          return <li key={`error-email-${i}`}>{el}</li>;
                        })}
                      </ul>
                    </div>
                    <br />
                    <Button
                      isSpinner={isLoading}
                      isPrimary
                      className={`w-100  rounded-3 mb-3  align-items-center justify-content-center ${disable ? "d-none" : "d-inline-flex"} ${!dataLupaPassword.email || disableButton ? "disabled layer" : ""}`}
                      onClick={validateEmail}
                    >
                      <span className="me-2 mb-0">Kirim Kode Unik</span>
                    </Button>
                  </div>
                  <Button className={`btn w-100 text-cream mb-3 align-items-center justify-content-center ${disable ? "disabled " : ""} ${show.formCode ? "d-inline-flex " : "d-none"}`} onClick={showButtonResendCode}>
                    <span className="me-2">Kirim Ulang Kode Unik</span>
                    <span className={disable ? "d-inline-block" : "d-none"}>{count < 10 ? `0${count}` : count}</span>
                  </Button>

                  <div className={`${show.formCode ? "" : "d-none"}`}>
                    <label htmlFor="email">Kode Unik</label>
                    <br />
                    <span style={{ fontSize: "12px" }}>*Masukan kode unik yang telah dikirimkan melalui email</span>
                    <br />
                    <div class="d-flex code-form">
                      <input type="text" onKeyUp={focusSet} id="email" maxLength="1" indeks="1" name="email" className="1 me-2" />
                      <input type="text" onKeyUp={focusSet} id="email" maxLength="1" indeks="2" name="email" className="2 me-2" />
                      <input type="text" onKeyUp={focusSet} id="email" maxLength="1" indeks="3" name="email" className="3 me-2" />
                      <input type="text" onKeyUp={focusSet} id="email" maxLength="1" indeks="4" name="email" className="4 me-2" />
                      <input type="text" onKeyUp={focusSet} id="email" maxLength="1" indeks="5" name="email" className="5 me-2" />
                      <input type="text" onKeyUp={focusSet} id="email" maxLength="1" indeks="6" name="email" className="6" />
                    </div>
                    <br />
                    <span style={{ fontSize: "13px" }} className={`alert alert-danger w-100 text-center ${errors.errValidateCode.length > 0 ? "d-inline-block" : "d-none"}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-exclamation-circle me-3" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                      </svg>
                      {errors.errValidateCode[0]}
                    </span>
                    <Button isSpinner={spinnerUniqueCode} isPrimary className={`w-100 rounded-3 mb-3 d-inline-flex align-items-center justify-content-center ${disableValidate ? "disabled layer" : ""}`} onClick={validateUniqueCode}>
                      <span className="me-2">Validasi</span>
                    </Button>
                  </div>

                  <p className="text-center mt-4 mb-0">
                    <Button type="link" href="/login" className="daftar text-white">
                      Kembali
                    </Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ModalElement isDongker={true} show={showBoxResetPassword} isCentered={true} funcModal={handleCloseBoxReset}>
            <div class="d-flex text-dongker justify-content-between align-items-center shadow-none mb-4" onClick={handleCloseBoxReset}>
              <p>Reset Password</p>
              <button className="btn p-0 m-0 fw-bold">x</button>
            </div>
            <div class="text-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-check2-circle text-success " viewBox="0 0 16 16">
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
              </svg>
              <h4 className="text-success mb-0 fw-bolder">Yeay, Kode Valid</h4>
              <span style={{ fontSize: "12px" }}>
                <strong className="text-danger">*</strong> Kode hanya aktif selama 5 Menit, segera Ubah Password Mu
              </span>
            </div>

            <label htmlFor="username" className="text-dongker">
              Password Baru
            </label>
            <input id="newPassword" type="password" className="form-control shadow-none mb-3" placeholder="Password Baru" onChange={(e) => setDataLupaPassword({ ...dataLupaPassword, newPassword: e.target.value })} />
            <label htmlFor="name" className="text-dongker">
              Konfirmasi Password Baru
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              className="form-control shadow-none mb-3"
              placeholder="Konfirmasi Password Baru"
              onChange={(e) => setDataLupaPassword({ ...dataLupaPassword, confirmNewPassword: e.target.value })}
            />
            <div className={`alert alert-danger pb-0 ${errors.errValidatePassword.length === 0 ? "d-none" : ""}`} role="alert" style={{ fontSize: "13px" }}>
              <ul>
                {errors.errValidatePassword.map((el, i) => {
                  return <li key={`error-password-${i}`}>{el}</li>;
                })}
              </ul>
            </div>
            <Button isPrimary isDongker className="w-100  fs-6  shadow-none" isSpinner={spinnerPassword} onClick={updateNewPassword}>
              Simpan
            </Button>
          </ModalElement>
          <ModalElement isHeader={false} isCentered={true} show={showBoxNotifSuccess} funcModal={handleCloseNotifSuccess} heading={"Profil"}>
            <div className="d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-exclamation-circle me-3 text-success" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
              <span>
                Password Berhasil di ubah.{" "}
                <a className="ms-2 text-dongker mb-0" href="/login">
                  Kembali
                </a>
              </span>
            </div>
          </ModalElement>
        </section>
      )}
    </>
  );
}
