import React, { useState } from "react";
import { returnFormatDate, rupiahFormats } from "../utils/numberFormat";
import Card from "../element/Card";
import Button from "../element/Button";

export default function ChatElement({ dataChatLoading, dataChat, userData, typeChat, isLoggedIn, handleZoomImage }) {
  const tampilPesan = () => {
    let dataWaktu = returnFormatDate();
    console.log(dataChat);
    if (dataChat?.chats.length > 0) {
      let dataLoading = [];
      if (dataChatLoading.length > 0) {
        let result = dataChatLoading.map((el, i) => {
          return (
            <>
              <div className={`chat-item ${el.iduser === userData._id ? "me" : ""} `} key={`datachatloading${i}`}>
                <div className={`image ${el.uploadFile ? "" : "d-none"}`}>
                  <img src={el.image} alt="chat-image" />
                  <div className="lds-ring d-inline-props">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
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
        if (el.pesan || el.image) {
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
                <div className={`image ${el.image ? "" : "d-none"}`}>
                  <img src={el.imageUrl} alt="chat-image" />

                  <button className="btn zoom" onClick={handleZoomImage} imageUrl={el.imageUrl}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-eye-fill text-dongker" viewBox="0 0 16 16">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                  </button>
                </div>
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
        }
        if (el.hightlight) {
          return (
            <div className="chat-item highlight">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-megaphone-fill mx-2 text-cream" viewBox="0 0 16 16">
                <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-11zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25.222 25.222 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56V3.224zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009a68.14 68.14 0 0 1 .496.008 64 64 0 0 1 1.51.048zm1.39 1.081c.285.021.569.047.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a65.81 65.81 0 0 1 1.692.064c.327.017.65.037.966.06z" />
              </svg>
              <span>Info Penting</span>

              <div class="d-flex justify-content-center mt-3">
                <Card
                  isHorisontal={true}
                  linkUrl={`/detail/${el.idHighlight}`}
                  imgSrc={el.eventImage}
                  judul={el.eventName}
                  penyelenggara={el.institution}
                  kategori={el.eventCategory}
                  waktu={el.eventDate}
                  paymentType={el.paymentType}
                  price={rupiahFormats(el.price)}
                />
              </div>
              <p className="mt-3 text-cream" style={{ fontSize: "14px" }}>
                Ada kegiatan yang Cocok nih untukmu
              </p>
            </div>
          );
        }

        if (el.kondisi === "keluar") {
          if (typeChat == "notpersonal") {
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
            return "";
          }
        } else if (el.kondisi === "masuk") {
          if (typeChat == "notpersonal") {
            return (
              <div className="chat-item notif-masuk">
                <p className="text-capitalize pb-0 d-inline-flex align-items-center">
                  {isLoggedIn ? (
                    el.namauser
                  ) : el.iduser?.includes("anonymous") ? (
                    `Anonymous${el.iduser?.slice(8, 12)}`
                  ) : (
                    <>
                      Saika-{el.iduser?.slice(8, 11).toUpperCase()}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-patch-check-fill ms-1 text-cream" viewBox="0 0 16 16">
                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                      </svg>
                    </>
                  )}
                  <span className="ms-2">Masuk Room</span>
                </p>
              </div>
            );
          } else {
            return "";
          }
        } else {
          return "";
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
