import React from "react";
import { returnFormatDate } from "../utils/numberFormat";

export default function ChatElement({ dataChatLoading, dataChat, userData, typeChat }) {
  const tampilPesan = () => {
    let dataWaktu = returnFormatDate();

    if (dataChat?.chats.length > 0) {
      let dataLoading = [];
      if (dataChatLoading.length > 0) {
        let result = dataChatLoading.map((el, i) => {
          return (
            <>
              <div className={`chat-item ${el.iduser === userData._id ? "me" : ""} `} key={`datachatloading${i}`}>
                <p className="value">{el.pesan}</p>
                <p className={`jam ${el.iduser === userData._id ? "me" : ""} `}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13px" height="13px" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                  </svg>
                </p>
              </div>
            </>
          );
        });
        dataLoading.push(...result);
      }
      let data = dataChat.chats.map((el, i) => {
        if (el.pesan) {
          return (
            <>
              <div className={`chat-item ${el.iduser === userData._id ? "me" : ""} `} key={`datachat${i}`}>
                <p className={`user text-capitalize ${typeChat === "personal" ? "d-none" : el.iduser === userData._id ? "d-none" : ""}`}>{el.usernameuser}</p>
                <p className="value">{el.pesan}</p>
                {!el._id ? (
                  <p className={`jam ${el.iduser === userData._id ? "me" : ""} `}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13px" height="13px" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                    </svg>
                  </p>
                ) : (
                  <p className={`jam ${el.iduser === userData._id ? "me" : ""} `}>
                    {el.waktu}
                    {el.iduser === userData._id ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                      </svg>
                    ) : (
                      ""
                    )}
                  </p>
                )}
              </div>

              {el.tanggal === dataChat.chats[i + 1]?.tanggal ? (
                ""
              ) : (
                <div className="chat-date">
                  <p className="fw-bolder">{el.tanggal === dataWaktu.tanggalKirim ? "Hari Ini" : el.tanggal}</p>
                </div>
              )}
            </>
          );
        } else {
          if (el.kondisi === "keluar") {
            return (
              <div className="chat-item notif-keluar ">
                <p className="text-capitalize pb-0 ">
                  <strong>{el.namauser}</strong> Keluar dari Room
                </p>
              </div>
            );
          } else {
            return (
              <div className="chat-item notif-masuk">
                <p className="text-capitalize pb-0">
                  <strong>{el.namauser}</strong> Masuk Room
                </p>
              </div>
            );
          }
        }
      });

      return [...dataLoading, ...data];
    } else {
      return (
        <div className="chat-item notif-masuk">
          <p className="text-capitalize pb-0">Ayo Mulai percakapan dengan Teman Baru Mu</p>
        </div>
      );
    }
  };

  return tampilPesan();
}
