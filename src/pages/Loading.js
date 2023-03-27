import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import io from "socket.io-client";
import Axios from "axios";
import Button from "../element/Button";

export default function Loading({ socket }) {
  const userObj = JSON.parse(localStorage.getItem("userSaika"));
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userData = useSelector((state) => state.user.user);
  const [idRoom, setIdRoom] = useState("");
  const [isStatus, setIsStatus] = useState("waiting");
  const [count, setCount] = useState(20);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery();

  // function countDown(amount) {
  //   let y = 20;
  //   let x = setInterval(() => {
  //     y--;
  //     setCount(y);
  //     if (y === 0) {
  //       clearInterval(x);
  //     }
  //   }, 1000);
  // }

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
        getDataRoom("registered", result.data);
      });
    };

    // countDown();

    const getDataRoom = (type, dataUser) => {
      let y = 0;
      let down = 20;
      let x = setInterval(() => {
        y++;
        setCount(down - y < 0 ? 0 : down - y);
        let data;
        if (type === "unregistered") {
          data = {
            kategori: query.get("kategori"),
            iduser: sessionStorage.getItem("iduseranonymous"),
            tipeUser: "unregistered",
            usernameuser: "anonymous",
            percobaan: y,
          };
        } else {
          data = {
            kategori: query.get("kategori"),
            tipeUser: "registered",
            iduser: userData._id,
            fotoUser: dataUser.fotoUser?.fotoUrl,
            namauser: dataUser.nama,
            usernameuser: dataUser.username ? dataUser.username : "@anonymous",
            percobaan: y,
          };
        }
        Axios({
          method: "POST",
          withCredentials: true,
          data: data,
          url: `http://localhost:3001/chats`,
          // headers: {
          //   Authorization: `Bearer ${userObj.token}`,
          // },
        })
          .then((result) => {
            if (result.data.status === "finish") {
              socket.emit("data_anggota", result.data.idroom);
              if (isLoggedIn) {
                socket.emit("anggota_masuk", { idroom: result.data.idroom, iduser: userData._id, namauser: dataUser.nama });
              } else {
                socket.emit("anggota_masuk", { idroom: result.data.idroom, iduser: sessionStorage.getItem("iduseranonymous"), namauser: sessionStorage.getItem("iduseranonymous") });
                localStorage.removeItem("limitAnonymous");
              }
              setIdRoom(result.data.idroom);
              setIsStatus("finish");
              clearInterval(x);
            } else if (result.data.status === "rejected") {
              setIsStatus("rejected");
              clearInterval(x);
            }
          })
          .catch((err) => {
            setIsStatus("rejected");
            console.log(err);
          });
      }, 1000);
    };

    if (isLoggedIn) {
      getDataUser();
    } else {
      getDataRoom("unregistered", null);
    }
  }, []);

  return (
    <div className="loading">
      {isStatus === "waiting" ? (
        <div className="animasi-load mx-auto text-center">
          <div className="image mx-auto">
            <img src="/image/loading.svg" alt="Icon animasi" />
          </div>
          <span className="count">{count}</span>
          <p className="mt-4 mb-3">
            Saika Sedang Mencarikanmu <br />
            Teman Yang Sedang Aktif, harap tunggu . . .
          </p>
          <div className="sahabat">
            <p>Loading</p>
          </div>
        </div>
      ) : (
        <>
          {isStatus === "rejected" ? (
            <div className="sorry mx-auto row align-items-center ">
              <div className="col-md text-md-end text-center">
                <img src="/image/sorry.svg" alt="Icon animasi" />
              </div>
              <div className="col-md text-center text-md-start ket">
                <p className="mb-4">
                  Yahhh SAIKA sudah berusaha <br />
                  Tapi ga ketemu temen yang sedang aktif
                </p>
                <Button isPrimary className="text-decoration-none  w-auto" type="link" href="/find">
                  Cari Teman Yang lain
                </Button>
              </div>
            </div>
          ) : (
            <Navigate to={`/live/${idRoom}`} />
          )}
        </>
      )}
    </div>
  );
}
