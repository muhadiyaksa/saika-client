import React, { useState, useCallback, useEffect } from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import Button from "../element/Button";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import DetailEvent from "../parts/DetailEvent";
import iconUpload from "../assets/icon/upload.png";
import ModalElement from "../element/ModalElement";
import Axios from "axios";
import { rupiahFormats } from "../utils/numberFormat";

export default function EventRegist() {
  const [ketFoto, setKetFoto] = useState({ ket: "", status: "hide", file: null });
  const [dataDetail, setDataDetail] = useState({
    eventName: "",
    eventImage: "",
    eventCategory: "",
    benefits: "",
    description: "",
    eventDate: "",
    jamMulai: "",
    jamSelesai: "",
    paymentType: "",
    price: "",
    registrationLink: "",
    instagram: "",
    facebook: "",
    twitter: "",
    occurenceType: "",
    mediaMeet: "",
    location: "",
    address: "",
  });
  const userObj = JSON.parse(localStorage.getItem("userSaika"));

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      const areaFoto = document.querySelector("p.area-foto");

      reader.readAsDataURL(file);

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        let validExtensions = ["image/jpg", "image/jpeg", "image/png"];

        if (validExtensions.includes(file.type) && file.size <= 2000000) {
          setKetFoto({ ket: `${file.name}`, status: "show", file: file });
          setDataDetail({ ...dataDetail, eventImage: reader.result });
        } else {
          areaFoto.innerHTML = "Foto Harus Berformat .png , .jpg , .jpeg dan Dibawah 2MB";
          setKetFoto({ ket: `Foto Harus Berformat .png , .jpg , .jpeg dan Dibawah 2MB`, status: "hide", file: null });
        }
      };
      // reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  const [showGeneral, setShowGeneral] = useState({ button: "", show: "", hideres: "" });
  const [showWarning, setShowWarning] = useState("d-none");

  const setGeneralInfo = () => {
    if (ketFoto.file && dataDetail.eventName && dataDetail.eventCategory && dataDetail.benefits && dataDetail.description) {
      setShowWarning("d-none");
      setShowGeneral({ button: "", show: "d-none", hideres: "sembunyi" });
      setShowJadwal({ button: "", show: "", hideres: "" });
    } else {
      setShowWarning("");
      setShowGeneral({ button: "", show: "", hideres: "" });
      setShowJadwal({ button: "null", show: "d-none", hideres: "sembunyi" });
    }
  };

  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  const [showJadwal, setShowJadwal] = useState({ button: "null", show: "d-none", hideres: "sembunyi" });
  const [showWarningJadwal, setShowWarningJadwal] = useState("d-none");

  const setGeneralJadwal = () => {
    if (dataDetail.eventDate && dataDetail.jamMulai && dataDetail.jamSelesai) {
      setShowWarningJadwal("d-none");
      setShowJadwal({ button: "", show: "d-none", hideres: "sembunyi" });
      setShowPendaftaran({ button: "", show: "", hideres: "" });
    } else {
      setShowWarningJadwal("");
      setShowJadwal({ button: "", show: "", hideres: "" });
      setShowPendaftaran({ button: "null", show: "d-none", hideres: "sembunyi" });
    }
    console.log(dataDetail.eventDate);
    console.log(new Date(dataDetail.eventDate).getTime());
  };

  const backtoGeneral = () => {
    if (dataDetail.eventDate && dataDetail.jamMulai && dataDetail.jamSelesai) {
      setShowJadwal({ button: "", show: "d-none", hideres: "sembunyi" });
    } else {
      setShowJadwal({ button: "null", show: "d-none", hideres: "sembunyi" });
    }
    setShowWarningJadwal("d-none");
    setShowGeneral({ button: "", show: "", hideres: "" });
  };
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  const [showPendaftaran, setShowPendaftaran] = useState({ button: "null", show: "d-none", hideres: "sembunyi" });
  const [showWarningPendaftaran, setShowWarningPendaftaran] = useState("d-none");

  const setGeneralPendaftaran = () => {
    if (dataDetail.paymentType && dataDetail.registrationLink) {
      if (dataDetail.paymentType === "bayar" && dataDetail.price) {
        setShowWarningPendaftaran("d-none");
        setShowPendaftaran({ button: "", show: "d-none", hideres: "sembunyi" });
        setShowLokasi({ button: "", show: "", hideres: "" });
      } else {
        if (dataDetail.paymentType === "gratis") {
          setShowWarningPendaftaran("d-none");
          setShowPendaftaran({ button: "", show: "d-none", hideres: "sembunyi" });
          setShowLokasi({ button: "", show: "", hideres: "" });
        } else {
          setShowWarningPendaftaran("");
          setShowPendaftaran({ button: "", show: "", hideres: "" });
          setShowLokasi({ button: "null", show: "d-none", hideres: "sembunyi" });
        }
      }
    } else {
      setShowWarningPendaftaran("");
      setShowPendaftaran({ button: "", show: "", hideres: "" });
      setShowLokasi({ button: "null", show: "d-none", hideres: "sembunyi" });
    }
  };

  const backtoJadwal = () => {
    if (dataDetail.paymentType && dataDetail.registrationLink) {
      if (dataDetail.paymentType === "bayar" && dataDetail.price) {
        setShowPendaftaran({ button: "", show: "d-none", hideres: "sembunyi" });
      } else {
        if (dataDetail.paymentType === "gratis") {
          setShowPendaftaran({ button: "", show: "d-none", hideres: "sembunyi" });
        } else {
          setShowPendaftaran({ button: "null", show: "d-none", hideres: "sembunyi" });
        }
      }
    } else {
      setShowPendaftaran({ button: "null", show: "d-none", hideres: "sembunyi" });
    }
    setShowWarningPendaftaran("d-none");
    setShowJadwal({ button: "", show: "", hideres: "" });
  };
  // let [nilaiRupiah, setNilaiRupiah] = useState("");
  const rupiah = (e) => {
    let nilai = rupiahFormats(e.target.value, "Rp. ");
    setDataDetail({
      ...dataDetail,
      price: e.target.value.replace(/[^,\d]/g, "").toString(),
    });
    e.target.value = nilai;
  };

  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  const [showLokasi, setShowLokasi] = useState({ button: "null", show: "d-none", hideres: "sembunyi" });
  const [showWarningLokasi, setShowWarningLokasi] = useState("d-none");

  const setGeneralLokasi = () => {
    if (dataDetail.occurenceType === "online" && dataDetail.mediaMeet) {
      setShowWarningLokasi("d-none");
      setShowLokasi({ button: "", show: "d-none", hideres: "sembunyi" });
      setShowReview({ button: "", show: "", hideres: "" });
    } else if (dataDetail.occurenceType === "offline" && dataDetail.location && dataDetail.address) {
      setShowWarningLokasi("d-none");
      setShowLokasi({ button: "", show: "d-none", hideres: "sembunyi" });
      setShowReview({ button: "", show: "", hideres: "" });
    } else {
      setShowWarningLokasi("");
      setShowLokasi({ button: "", show: "", hideres: "" });
      setShowReview({ button: "null", show: "d-none", hideres: "sembunyi" });
    }
  };
  const backtoPendaftaran = () => {
    if (dataDetail.occurenceType === "online" && dataDetail.mediaMeet) {
      setShowLokasi({ button: "", show: "d-none", hideres: "sembunyi" });
    } else if (dataDetail.occurenceType === "offline" && dataDetail.location && dataDetail.address) {
      setShowLokasi({ button: "", show: "d-none", hideres: "sembunyi" });
    } else {
      setShowLokasi({ button: "null", show: "d-none", hideres: "sembunyi" });
    }
    setShowWarningLokasi("d-none");
    setShowPendaftaran({ button: "", show: "", hideres: "" });
  };

  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showReview, setShowReview] = useState({ button: "null", show: "d-none", hideres: "sembunyi" });
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [listError, setListError] = useState([]);
  const handleCloseError = () => setShowError(false);

  const uploadToDatabase = () => {
    setIsLoading(true);
    const data = new FormData();
    data.append("email", userObj.user.email);
    data.append("eventName", dataDetail.eventName);
    data.append("eventCategory", dataDetail.eventCategory);
    data.append("eventImage", ketFoto.status);
    data.append("file", ketFoto.file);
    data.append("benefits", dataDetail.benefits);
    data.append("descriptions", dataDetail.description);
    data.append("eventDate", dataDetail.eventDate);
    data.append("eventTimeStart", dataDetail.jamMulai);
    data.append("eventTimeFinish", dataDetail.jamSelesai);
    data.append("paymentType", dataDetail.paymentType);
    data.append("price", dataDetail.price);
    data.append("registrationLink", dataDetail.registrationLink);
    data.append("instagram", dataDetail.instagram);
    data.append("facebook", dataDetail.facebook);
    data.append("twitter", dataDetail.twitter);
    data.append("occurenceType", dataDetail.occurenceType);
    data.append("mediaMeet", dataDetail.mediaMeet);
    data.append("location", dataDetail.location);
    data.append("address", dataDetail.address);

    Axios({
      method: "POST",
      data: data,
      withCredentials: true,
      url: "http://localhost:3001/event/addevent",
      // headers: {
      //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpYXNheWFuZ2JhbmdldHNhbWFhYnV0MkBnbWFpbC5jb20iLCJ1c2VySWQiOiI2MmUzOTQ2NTg0MTZlMGEyNTFjZjU2NmEiLCJpYXQiOjE2NTkwOTkyNTUsImV4cCI6MTY2MTY5MTI1NX0.GWMcALmOYy6XdBO3vb-F9TPvCz7G388hceRhuwB5pyw`,
      // },
    }).then((res) => {
      if (!res.data.errors) {
        setIsLoading(false);
      } else {
        setShow(false);
        setShowError(true);
        setListError(res.data.errors);
      }
    });
  };

  const backtoLokasi = () => {
    setShowReview({ button: "", show: "d-none", hideres: "sembunyi" });
    setShowLokasi({ button: "", show: "", hideres: "" });
  };

  return (
    <>
      <Header />
      <section className="addevent">
        <div className="container">
          <p className="border-bottom pt-4 pb-2 fw-bold">
            <Button type="link" href="/search">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-circle text-secondary me-3" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                />
              </svg>
            </Button>
            Tambah Acara
          </p>
          <div className="navtabs-button d-flex justify-content-between">
            <div className={`item d-flex align-items-center  ${showGeneral.hideres} ${showGeneral.button === "" ? "active" : ""}`}>
              <span>1</span>
              <p className={` ${showGeneral.hideres} `}>General Info</p>
            </div>
            <div className={`item d-flex align-items-center ${showJadwal.hideres}  ${showJadwal.button === "" ? "active" : ""}`}>
              <span>2</span>
              <p className={` ${showJadwal.hideres} `}>Jadwal</p>
            </div>
            <div className={`item d-flex align-items-center ${showPendaftaran.hideres} ${showPendaftaran.button === "" ? "active" : ""}`}>
              <span>3</span>
              <p className={` ${showPendaftaran.hideres} `}>Pendaftaran</p>
            </div>
            <div className={`item d-flex align-items-center ${showLokasi.hideres} ${showLokasi.button === "" ? "active" : ""}`}>
              <span>4</span>
              <p className={` ${showLokasi.hideres} `}>Lokasi</p>
            </div>
            <div className={`item d-flex align-items-center ${showReview.hideres} ${showReview.button === "" ? "active" : ""}`}>
              <span>5</span>
              <p className={` ${showReview.hideres} `}>Review</p>
            </div>
          </div>

          <div className="boxevent">
            <div className={`generalinfo ${showGeneral.show}`}>
              <p className="judul-1 mb-4">General Info</p>
              <div className="row">
                <div className="col-md-5">
                  <div className={`upload-image`} {...getRootProps()}>
                    <img src={iconUpload} alt="Upload" />
                    <p className={`area-foto ${ketFoto.status === "hide" ? "" : "d-none"} `}>
                      Seret foto ke area ini atau tekan tombol unggah dibawah ini. Pastikan foto telah memenuhi <span className="text-green">standar kualitas SAIKA.</span>
                    </p>
                    <p className={`${ketFoto.status === "hide" ? "d-none" : ""} ketfoto`}>{ketFoto.ket}</p>
                    <Button isPrimary className="m-0 py-2 px-4 rounded-3">
                      {ketFoto.status === "hide" ? "Unggah" : "Ganti"} Foto
                    </Button>
                    <input type="file" {...getInputProps()} />
                  </div>
                </div>
                <div className="col-md-7">
                  <label htmlFor="namaLengkap">
                    Nama Event<span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control shadow-none mb-3" id="namaLengkap" name="namaLengkap" placeholder="Nama Event" onChange={(e) => setDataDetail({ ...dataDetail, eventName: e.target.value })} />

                  <label htmlFor="kategori">
                    Kategori Acara<span className="text-danger">*</span>
                  </label>
                  <select name="kategori" id="kategori" className="form-select mb-3" onChange={(e) => setDataDetail({ ...dataDetail, eventCategory: e.target.value })}>
                    <option value="">Pilih Kategori</option>
                    <option value="rpl">Rekayasa Perangkat Lunak</option>
                    <option value="jarkom">Jaringan Komputer</option>
                    <option value="mm">Multimedia</option>
                  </select>

                  <label htmlFor="benefits">
                    Benefits<span className="text-danger">*</span>
                  </label>
                  <span className="d-block" style={{ fontSize: "11px" }}>
                    Pisahkan dengan <strong> Koma ','</strong> apabila benefits lebih dari 1
                  </span>
                  <input
                    type="text"
                    className="form-control shadow-none mb-3"
                    id="benefits"
                    name="benefits"
                    placeholder="Contoh: Ilmu, Snack, Relasi, Doorprize"
                    onChange={(e) => setDataDetail({ ...dataDetail, benefits: e.target.value })}
                  />

                  <label htmlFor="deskripsi">
                    Deskripsi<span className="text-danger">*</span>
                  </label>
                  <textarea
                    type="text"
                    className="form-control shadow-none mb-3"
                    id="deskripsi"
                    name="deskripsi"
                    placeholder="Berikan Gambaran Event Maksimal 150 Kata"
                    maxLength="250"
                    onChange={(e) => setDataDetail({ ...dataDetail, description: e.target.value })}
                  />

                  <div className={`alert alert-danger ${showWarning}`} role="alert" style={{ fontSize: "13px" }}>
                    Terdapat Data yang belum diisi!
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <Button type="link" href="/search" className="text-cyan me-4">
                  Batal
                </Button>
                <Button isPrimary className="rounded-3" onClick={setGeneralInfo}>
                  Selanjutnya
                </Button>
              </div>
            </div>

            <div className={`jadwalinfo ${showJadwal.show}`}>
              <p className="judul-1 mb-4">Jadwal</p>

              <label htmlFor="tanggalevent">
                Tanggal Pelaksanaan<span className="text-danger">*</span>
              </label>
              <input type="date" className="form-control shadow-none mb-3" id="tanggalevent" name="tanggalevent" onChange={(e) => setDataDetail({ ...dataDetail, eventDate: e.target.value })} />

              <label htmlFor="jammulai">
                Jam Mulai<span className="text-danger">*</span>
              </label>
              <input type="time" className="form-control shadow-none mb-3" id="jammulai" name="jammulai" onChange={(e) => setDataDetail({ ...dataDetail, jamMulai: e.target.value })} />

              <label htmlFor="jamselesai">
                Jam Selesai<span className="text-danger">*</span>
              </label>
              <input type="time" className="form-control shadow-none mb-3" id="namaLengkap" name="namaLengkap" onChange={(e) => setDataDetail({ ...dataDetail, jamSelesai: e.target.value })} />
              <div className={`alert alert-danger ${showWarningJadwal}`} role="alert" style={{ fontSize: "13px" }}>
                Terdapat Data yang belum diisi!
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <Button className="text-cyan me-4 bg-white border-0 text-decoration-underline" onClick={backtoGeneral}>
                  Kembali
                </Button>
                <Button isPrimary className="rounded-3" onClick={setGeneralJadwal}>
                  Selanjutnya
                </Button>
              </div>
            </div>

            <div className={`pendaftaraninfo ${showPendaftaran.show}`}>
              <p className="judul-1 mb-4">Pendaftaran</p>
              <label>Pilih Tipe Acara</label>
              <br />
              <input type="radio" id="gratis" name="fav_language" value="gratis" onChange={(e) => setDataDetail({ ...dataDetail, paymentType: e.target.value })} /> 
              <label htmlFor="gratis" className="me-4">
                Gratis
              </label>
              <input type="radio" id="bayar" name="fav_language" value="bayar" className="mb-3" onChange={(e) => setDataDetail({ ...dataDetail, paymentType: e.target.value })} />  <label htmlFor="bayar">Berbayar</label>
              <br />
              {dataDetail.paymentType === "bayar" ? (
                <>
                  <label htmlFor="harga">
                    Harga Tiket<span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control shadow-none mb-3" id="harga" name="harga" placeholder="Harga Tiket" onKeyUp={(e) => rupiah(e)} />
                </>
              ) : (
                ""
              )}
              <label htmlFor="linkpendaftaran">
                Link Pendaftaran<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control shadow-none mb-3"
                id="linkpendaftaran"
                name="linkpendaftaran"
                placeholder="Link Pendaftaran : bit.ly atau forms.gle dll"
                onChange={(e) => setDataDetail({ ...dataDetail, registrationLink: e.target.value })}
              />
              <label htmlFor="instagram">Link Instagram</label>
              <input type="text" className="form-control shadow-none mb-3" id="instagram" name="instagram" placeholder="Link Instagram (Optional)" onChange={(e) => setDataDetail({ ...dataDetail, instagram: e.target.value })} />
              <label htmlFor="facebook">Link Facebook</label>
              <input type="text" className="form-control shadow-none mb-3" id="facebook" name="facebook" placeholder="Link Facebook (Optional)" onChange={(e) => setDataDetail({ ...dataDetail, facebook: e.target.value })} />
              <label htmlFor="twitter">Link Twitter</label>
              <input type="text" className="form-control shadow-none mb-3" id="twitter" name="twitter" placeholder="Link Twitter (Optional)" onChange={(e) => setDataDetail({ ...dataDetail, twitter: e.target.value })} />
              <div className={`alert alert-danger ${showWarningPendaftaran}`} role="alert" style={{ fontSize: "13px" }}>
                Terdapat Data yang belum diisi!
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <Button className="text-cyan me-4 bg-white border-0 text-decoration-underline" onClick={backtoJadwal}>
                  Kembali
                </Button>
                <Button isPrimary className="rounded-3" onClick={setGeneralPendaftaran}>
                  Selanjutnya
                </Button>
              </div>
            </div>

            <div className={`lokasiinfo ${showLokasi.show}`}>
              <p className="judul-1 mb-4">Lokasi</p>
              <label htmlFor="tipe">Tipe Acara</label>
              <select name="tipe" id="tipe" className="form-select mb-3" onChange={(e) => setDataDetail({ ...dataDetail, occurenceType: e.target.value, mediaMeet: e.target.value === "online" ? "zoom" : "" })}>
                <option value="">Pilih Tipe Acara</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
              {dataDetail.occurenceType === "online" ? (
                <>
                  <label htmlFor="harga">Pemilihan Tempat Meeting Online</label>
                  <select name="tipe" id="tipe" className="form-select mb-3" onChange={(e) => setDataDetail({ ...dataDetail, mediaMeet: e.target.value })}>
                    <option value="zoom">Zoom</option>
                    <option value="googlemeet">Google Meet</option>
                  </select>
                </>
              ) : (
                <>
                  <label htmlFor="tempat">Tempat</label>
                  <input type="text" className="form-control shadow-none mb-3" id="tempat" name="tempat" placeholder="Ex: Gedung A Lantai 10" onChange={(e) => setDataDetail({ ...dataDetail, location: e.target.value })} />
                  <label htmlFor="alamat">Alamat Lengkap Dari Tempat Acara</label>
                  <input type="text" className="form-control shadow-none mb-3" id="alamat" name="alamat" placeholder="Ex: Jalan Raya No 1, RT.01/01" onChange={(e) => setDataDetail({ ...dataDetail, address: e.target.value })} />
                </>
              )}
              <div className={`alert alert-danger ${showWarningLokasi}`} role="alert" style={{ fontSize: "13px" }}>
                Terdapat Data yang belum diisi!
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <Button className="text-cyan me-4 bg-white border-0 text-decoration-underline" onClick={backtoPendaftaran}>
                  Kembali
                </Button>
                <Button isPrimary className="rounded-3" onClick={setGeneralLokasi}>
                  Selanjutnya
                </Button>
              </div>
            </div>

            <div className={`reviewinfo ${showReview.show}`}>
              <div className="detail">
                <DetailEvent dataDetail={dataDetail} />
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <Button className="text-cyan me-4 bg-white border-0 text-decoration-underline" onClick={backtoLokasi}>
                  Kembali
                </Button>
                <Button isPrimary className="rounded-3" onClick={handleShow}>
                  Upload
                </Button>
              </div>
              <ModalElement show={show} funcModal={handleClose} heading={"Konfirmasi"}>
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-check-circle text-cyan" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                  </svg>
                  <p className="w-75 mx-auto mt-3" style={{ fontSize: "13px" }}>
                    Pastikan data sudah benar, Data yang sudah diupload tidak bisa dihapus
                  </p>
                  <p className="w-75 mx-auto mt-3">Apakah sudah yakin untuk Upload?</p>
                  <Button isPrimary className="w-100" onClick={uploadToDatabase}>
                    Ya, Saya yakin
                  </Button>
                </div>
              </ModalElement>
              <ModalElement show={showError} funcModal={handleCloseError}>
                <>
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-exclamation-circle text-danger" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                    </svg>
                    <p className="w-75 mx-auto mt-3" style={{ fontSize: "14px" }}>
                      Data yang kamu kirimkan belum benar
                    </p>
                  </div>
                  <ul className="mt-3" style={{ fontSize: "13px" }}>
                    {listError.map((el) => {
                      return <li className="text-danger">{el.msg}</li>;
                    })}
                  </ul>
                </>
              </ModalElement>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
