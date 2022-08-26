import React from "react";
import Button from "../element/Button";
import Instagram from "../assets/icon/instagram.png";
import Facebook from "../assets/icon/facebook.png";
import Twitter from "../assets/icon/twitter.png";
import { numberFormat } from "../utils/numberFormat";

export default function DetailEvent({ dataDetail }) {
  return (
    <>
      <p className="border-bottom pt-4 pb-2 fw-bold">
        <Button type="link" href="/search">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-circle text-secondary me-3" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
          </svg>
        </Button>
        Detail Webinar
      </p>
      <div className="row">
        <div className="col-md-4">
          <div className="image detail mb-3">
            <img src={dataDetail.eventImage} alt="" />
          </div>
        </div>
        <div className="col-md p-3">
          <p className="judul-1 text-center text-sm-start ">{dataDetail.eventName}</p>
          <div className="row mt-3">
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Kategori Acara</p>
              <p>{dataDetail.eventCategory === "rpl" ? "Rekayasa Perangkat Lunak" : dataDetail.eventCategory === "mm" ? "Multimedia" : "Jaringan Komputer"}</p>
            </div>
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Benefit</p>
              <p>{dataDetail.benefits}</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Tanggal Pelaksanaan</p>
              <p>{dataDetail.eventDate}</p>
            </div>
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Waktu Pelaksanaan</p>
              <p>
                {dataDetail.jamMulai} WIB - {dataDetail.jamSelesai} WIB
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Tipe Acara</p>
              <p>
                {dataDetail.paymentType} {dataDetail.paymentType === "bayar" ? `, ${numberFormat(dataDetail.price)}` : ""}
              </p>
            </div>
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Link Pendaftaran</p>
              <p>
                <Button type="link" isExternal href={dataDetail.registrationLink} className="text-cyan">
                  {dataDetail.registrationLink}
                </Button>
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Pelaksanaan </p>
              <p>
                {dataDetail.occurenceType} {dataDetail.occurenceType === "online" ? `, ${dataDetail.mediaMeet}` : ""}
              </p>
            </div>
            <div className="col-md">
              <p className="fw-bold mb-0 pb-0">Media Sosial </p>
              <div className="social d-flex align-items-center">
                {dataDetail.instagram !== undefined ? (
                  <Button type="link" href={dataDetail.instagram} isExternal className="me-2 mt-2">
                    <img src={Instagram} alt="" />
                  </Button>
                ) : (
                  ""
                )}
                {dataDetail.facebook !== undefined ? (
                  <Button type="link" href={dataDetail.facebook} isExternal className="me-2 mt-2">
                    <img src={Facebook} alt="" />
                  </Button>
                ) : (
                  ""
                )}
                {dataDetail.twitter !== undefined ? (
                  <Button type="link" href={dataDetail.twitter} isExternal className="me-2 mt-2">
                    <img src={Twitter} alt="" />
                  </Button>
                ) : (
                  ""
                )}
                {dataDetail.instagram && dataDetail.twitter && dataDetail.facebook ? "" : "Tidak tersedia"}
              </div>
            </div>
          </div>
          {dataDetail.occurenceType === "offline" ? (
            <div className="row mt-3">
              <div className="col-md">
                <p className="fw-bold mb-0 pb-0">Tempat</p>
                <p>{dataDetail.location}</p>
              </div>
              <div className="col-md">
                <p className="fw-bold mb-0 pb-0">Alamat</p>
                <p>{dataDetail.address}</p>
              </div>
            </div>
          ) : (
            ""
          )}
          <p className="fw-bold mb-0 pb-0 mt-3">Deskripsi</p>
          <p>{dataDetail.description}</p>
        </div>
      </div>
    </>
  );
}
