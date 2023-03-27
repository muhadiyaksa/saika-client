import React from "react";
import { returnFormatDate } from "../utils/numberFormat";

export default function ChatElement({ dataChatLoading, dataChat, userData, typeChat, isLoggedIn }) {
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
                <p className={`user d-inline-flex align-items-center text-capitalize ${typeChat === "personal" ? "d-none" : el.iduser === userData._id ? "d-none" : ""} ${el.iduser.includes("anonymous") ? "text-cream" : ""}`}>
                  {isLoggedIn ? (
                    el.usernameuser
                  ) : el.iduser.includes("anonymous") ? (
                    `Anonymous${el.iduser.slice(8, 12)}`
                  ) : (
                    <>
                      Saika-{el.iduser.slice(8, 11).toUpperCase()}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-patch-check-fill ms-1 text-cream" viewBox="0 0 16 16">
                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                      </svg>
                    </>
                  )}
                </p>
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
                <p className="text-capitalize pb-0 d-inline-flex align-items-center">
                  {isLoggedIn ? (
                    el.namauser
                  ) : el.iduser.includes("anonymous") ? (
                    `Anonymous${el.iduser.slice(8, 12)}`
                  ) : (
                    <>
                      Saika-{el.iduser.slice(8, 11).toUpperCase()}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-patch-check-fill ms-1 text-cream" viewBox="0 0 16 16">
                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                      </svg>
                    </>
                  )}
                  <span className="ms-2">Keluar dari Room</span>
                </p>
              </div>
            );
          } else {
            return (
              <div className="chat-item notif-masuk">
                <p className="text-capitalize pb-0 d-inline-flex align-items-center">
                  {isLoggedIn ? (
                    el.namauser
                  ) : el.iduser.includes("anonymous") ? (
                    `Anonymous${el.iduser.slice(8, 12)}`
                  ) : (
                    <>
                      Saika-{el.iduser.slice(8, 11).toUpperCase()}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-patch-check-fill ms-1 text-cream" viewBox="0 0 16 16">
                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                      </svg>
                    </>
                  )}
                  <span className="ms-2">Masuk Room</span>
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
