import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Button from "../element/Button";
export default function ForgetPassword() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [dataLupaPassword, setDataLupaPassword] = useState({});
  const [errors, setErrors] = useState([]);
  const [count, setCount] = useState(20);
  const [disable, setDisable] = useState(false);
  const [show, setshow] = useState({ formEmail: true, formCode: false });
  const sendUniqueCode = () => {
    console.log("hai");
    setshow({ formEmail: false, formCode: true });
    setDisable(true);
    let y = 20;
    let x = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
      y--;
      if (y < 1) {
        setDisable(false);
        setCount(20);
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
    if (e.target.value) {
      if (indeks === "6") {
        setDisableValidate(false);
      } else {
        inputCode[+indeks].focus();
      }
    }
    let inputValue = [...inputCode];
    let data = inputValue.filter((el) => el.value === "" || !el.value);
    if (data.length > 0) {
      setDisableValidate(true);
    }
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

                    <br />
                    <div className={`alert alert-danger pb-0 ${errors.length === 0 ? "d-none" : ""}`} role="alert" style={{ fontSize: "13px" }}>
                      <ul>
                        {errors.map((el, i) => {
                          return <li key={`error-${i}`}>{el}</li>;
                        })}
                      </ul>
                    </div>
                    <Button isPrimary className={`w-100 rounded-3 mb-3  align-items-center justify-content-center ${disable ? "d-none" : "d-inline-flex"}`} onClick={sendUniqueCode}>
                      <span className="me-2">Kirim Kode Unik</span>
                    </Button>
                  </div>
                  <Button className={`btn w-100 text-cream mb-3 align-items-center justify-content-center ${disable ? "disabled " : ""} ${show.formCode ? "d-inline-flex " : "d-none"}`} onClick={showButtonResendCode}>
                    <span className="me-2">Kirim Ulang Kode Unik</span>
                    <span className={disable ? "d-inline-block" : "d-none"}>{count < 10 ? `0${count}` : count}</span>
                  </Button>

                  <div className={`${show.formCode ? "" : "d-none"}`}>
                    <label htmlFor="email">Kode Unik</label>
                    <br />
                    <div class="d-flex code-form">
                      <input type="text" onKeyUp={focusSet} id="email" maxLength="1" indeks="1" name="email" className="1 me-2" onChange={(e) => setDataLupaPassword({ ...dataLupaPassword, email: e.target.value })} />
                      <input type="text" onKeyUp={focusSet} id="email" maxLength="1" indeks="2" name="email" className="2 me-2" onChange={(e) => setDataLupaPassword({ ...dataLupaPassword, email: e.target.value })} />
                      <input type="text" onKeyUp={focusSet} id="email" maxLength="1" indeks="3" name="email" className="3 me-2" onChange={(e) => setDataLupaPassword({ ...dataLupaPassword, email: e.target.value })} />
                      <input type="text" onKeyUp={focusSet} id="email" maxLength="1" indeks="4" name="email" className="4 me-2" onChange={(e) => setDataLupaPassword({ ...dataLupaPassword, email: e.target.value })} />
                      <input type="text" onKeyUp={focusSet} id="email" maxLength="1" indeks="5" name="email" className="5 me-2" onChange={(e) => setDataLupaPassword({ ...dataLupaPassword, email: e.target.value })} />
                      <input type="text" onKeyUp={focusSet} id="email" maxLength="1" indeks="6" name="email" className="6" onChange={(e) => setDataLupaPassword({ ...dataLupaPassword, email: e.target.value })} />
                    </div>
                    <br />

                    <Button isPrimary className={`w-100 rounded-3 mb-3 d-inline-flex align-items-center justify-content-center ${disableValidate ? "disabled layer" : ""}`} onClick={sendUniqueCode}>
                      <span className="me-2">Validasi</span>
                    </Button>
                  </div>

                  <p className="text-center mt-4 mb-0">
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
