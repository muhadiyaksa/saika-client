import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Navigate, useLocation } from "react-router-dom";
import Sorry from "../assets/image/sorry.svg";
import IconAnimasi from "../assets/image/animation.png";
import io from "socket.io-client";
import Axios from "axios";
import Button from "../element/Button";

export default function Loading() {
  const socket = io.connect("http://localhost:3001");
  const userObj = JSON.parse(localStorage.getItem("userSaika"));
  const userData = useSelector((state) => state.user.user);
  const [idRoom, setIdRoom] = useState("");
  const [isStatus, setIsStatus] = useState("waiting");

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery();

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
        getDataRoom(result.data);
      });
    };
    getDataUser();

    const getDataRoom = (dataUser) => {
      let y = 0;
      let x = setInterval(() => {
        y++;
        console.log(y);
        Axios({
          method: "POST",
          withCredentials: true,
          data: {
            kategori: query.get("kategori"),
            iduser: userData._id,
            fotoUser: "",
            namauser: dataUser.nama,
            usernameuser: dataUser.username ? dataUser.username : "@anonymous",
            percobaan: y,
          },
          url: `http://localhost:3001/chats`,
          headers: {
            Authorization: `Bearer ${userObj.token}`,
          },
        }).then((result) => {
          if (result.data.status === "finish") {
            socket.emit("data_anggota", result.data.idroom);
            socket.emit("anggota_masuk", { idroom: result.data.idroom, iduser: userData._id });
            setIdRoom(result.data.idroom);
            setIsStatus("finish");
            clearInterval(x);
          } else if (result.data.status === "rejected") {
            setIsStatus("rejected");
            clearInterval(x);
          }
        });
      }, 1000);
    };
  }, []);

  return (
    <div className="loading">
      {isStatus === "waiting" ? (
        <div className="animasi-load mx-auto text-center">
          <img src={IconAnimasi} alt="Icon animasi" />
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
                <img src={Sorry} alt="Icon animasi" />
              </div>
              <div className="col-md text-center text-md-start ket">
                <p>
                  Yahhh SAIKA sudah berusaha <br />
                  Tapi ga ketemu temen yang sedang aktif
                </p>
                <Button isPrimary className="text-decoration-none text-white w-auto" type="link" href="/find">
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
