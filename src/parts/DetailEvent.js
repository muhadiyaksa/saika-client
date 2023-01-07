import React from "react";
import Button from "../element/Button";
import Instagram from "../assets/icon/instagram.png";
import Facebook from "../assets/icon/facebook.png";
import Twitter from "../assets/icon/twitter.png";
import { numberFormat, changeDateFormat } from "../utils/numberFormat";

export default function DetailEvent({ dataDetail, isLoading }) {
  // const waiting = new Promise((fulfil, reject) => {
  //   if (dataDetail.eventName) {
  //     return fulfil(dataDetail);
  //   }
  // });

  // waiting.then((res) => {
  //   console.log(res);
  // });

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="image detailinfo mb-3">
            <img src={dataDetail?.eventImage} alt="" />
          </div>
        </div>
        <div className="col-md p-3">
          <p className="judul-1 text-center text-sm-start text-softwhite">{dataDetail?.eventName}</p>
          <p>
            Oleh <strong className="text-decoration-underline">{dataDetail?.institution}</strong>
          </p>
          <div className="row mt-3">
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Kategori Acara</p>
              <p>{dataDetail?.eventCategory === "rpl" ? "Rekayasa Perangkat Lunak" : dataDetail?.eventCategory === "mm" ? "Multimedia" : "Jaringan Komputer"}</p>
            </div>
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Benefit</p>
              <p>{dataDetail?.benefits}</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Tanggal Pelaksanaan</p>
              <p>{changeDateFormat(dataDetail?.eventDate)}</p>
            </div>
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Waktu Pelaksanaan</p>
              <p>
                {dataDetail?.eventTimeStart} WIB - {dataDetail?.eventTimeFinish} WIB
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Tipe Acara</p>
              <p>
                <span class="text-capitalize">{dataDetail?.paymentType}</span> <br />
                {dataDetail?.paymentType === "bayar" ? `Rp. ${numberFormat(dataDetail?.price)}` : ""}
              </p>
            </div>
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Link Pendaftaran</p>
              <p>
                <Button isSecondary type="link" isExternal href={dataDetail?.registrationLink} className="d-inline-block  text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-link-45deg me-2" viewBox="0 0 16 16">
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                  </svg>
                  {dataDetail?.registrationLink}
                </Button>
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Pelaksanaan </p>
              <p className="mb-0">{dataDetail?.occurenceType}</p>
              {dataDetail?.occurenceType === "online" ? (
                <>
                  <div class="image">
                    <img width="30" height="30" className="me-2 " src={`${dataDetail?.mediaMeet === "zoom" ? "/image/zoom_icon.png" : "/image/meet_icon.png"}`} alt="" />
                  </div>
                  <span className="text-softwhite text-capitalize">{dataDetail?.mediaMeet}</span>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Media Sosial </p>
              <div className="social d-flex align-items-center">
                {dataDetail?.instagram !== "" ? (
                  <Button type="link" href={dataDetail?.instagram} isExternal className="me-2 mt-2">
                    <img src={Instagram} alt="" />
                  </Button>
                ) : (
                  ""
                )}
                {dataDetail?.facebook !== "" ? (
                  <Button type="link" href={dataDetail?.facebook} isExternal className="me-2 mt-2">
                    <img src={Facebook} alt="" />
                  </Button>
                ) : (
                  ""
                )}
                {dataDetail?.twitter !== "" ? (
                  <Button type="link" href={dataDetail?.twitter} isExternal className="me-2 mt-2">
                    <img src={Twitter} alt="" />
                  </Button>
                ) : (
                  ""
                )}
                {dataDetail?.instagram && dataDetail?.twitter && dataDetail?.facebook ? "" : <p>Tidak tersedia</p>}
              </div>
            </div>
          </div>
          {dataDetail?.occurenceType === "offline" ? (
            <div className="row mt-3">
              <div className="col-md">
                <p className="fw-bold mb-0 pb-0">Tempat</p>
                <p>{dataDetail?.location}</p>
              </div>
              <div className="col-md">
                <p className="fw-bold mb-0 pb-0">Alamat</p>
                <p>{dataDetail?.address}</p>
              </div>
            </div>
          ) : (
            ""
          )}
          <p className="fw-bold mb-0 pb-0 mt-3">Deskripsi</p>
          <p>{dataDetail?.description}</p>
        </div>
      </div>
    </>
  );
}
