import React, { useState, useCallback, useEffect } from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import Button from "../element/Button";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import DetailEvent from "../parts/DetailEvent";
import iconUpload from "../assets/icon/upload.png";
import ModalElement from "../element/ModalElement";

export default function EventRegist() {
  const [ketFoto, setKetFoto] = useState({ ket: "", status: "hide", file: null });
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      const areaFoto = document.querySelector("p.area-foto");
      const data = new FormData();
      data.append("file", file);

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        let validExtensions = ["image/jpg", "image/jpeg", "image/png"];
        const binaryStr = reader.result;

        if (validExtensions.includes(file.type) && file.size <= 2000000) {
          setKetFoto({ ket: `${file.name}`, status: "show", file: data });
        } else {
          areaFoto.innerHTML = "Foto Harus Berformat .png , .jpg , .jpeg dan Dibawah 2MB";
          setKetFoto({ ket: `Foto Harus Berformat .png , .jpg , .jpeg dan Dibawah 2MB`, status: "hide", file: null });
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  //---------------------------------------------------------------------
  const [dataGeneral, setDataGeneral] = useState({});
  const [showGeneral, setShowGeneral] = useState({ button: "", show: "" });

  const [showWarning, setShowWarning] = useState("d-none");
  const setGeneralInfo = () => {
    if (ketFoto.file && dataGeneral.namaevent && dataGeneral.kategori && dataGeneral.benefit && dataGeneral.deskripsi) {
      setShowWarning("d-none");
      setShowGeneral({ button: "", show: "d-none" });
      setShowJadwal({ button: "", show: "" });
    } else {
      setShowWarning("");
      setShowGeneral({ button: "", show: "" });
      setShowJadwal({ button: "null", show: "d-none" });
    }
  };

  //---------------------------------------------------------------------
  const [dataJadwal, setDataJadwal] = useState({});
  const [showJadwal, setShowJadwal] = useState({ button: "null", show: "d-none" });

  const [showWarningJadwal, setShowWarningJadwal] = useState("d-none");
  const setGeneralJadwal = () => {
    if (dataJadwal.tanggalevent && dataJadwal.jammulai && dataJadwal.jamselesai) {
      setShowWarningJadwal("d-none");
      setShowJadwal({ button: "", show: "d-none" });
      setShowPendaftaran({ button: "", show: "" });
    } else {
      setShowWarningJadwal("");
      setShowJadwal({ button: "", show: "" });
      setShowPendaftaran({ button: "null", show: "d-none" });
    }
  };

  const backtoGeneral = () => {
    if (dataJadwal.tanggalevent && dataJadwal.jammulai && dataJadwal.jamselesai) {
      setShowJadwal({ button: "", show: "d-none" });
    } else {
      setShowJadwal({ button: "null", show: "d-none" });
    }
    setShowWarningJadwal("d-none");
    setShowGeneral({ button: "", show: "" });
  };
  //---------------------------------------------------------------------
  const [dataPendaftaran, setDataPendaftaran] = useState({});
  const [showPendaftaran, setShowPendaftaran] = useState({ button: "null", show: "d-none" });

  const [showWarningPendaftaran, setShowWarningPendaftaran] = useState("d-none");
  const setGeneralPendaftaran = () => {
    console.log(dataPendaftaran.biaya);
    if (dataPendaftaran.tipeacara && dataPendaftaran.linkdaftar) {
      if (dataPendaftaran.tipeacara === "bayar" && dataPendaftaran.biaya) {
        setShowWarningPendaftaran("d-none");
        setShowPendaftaran({ button: "", show: "d-none" });
        setShowLokasi({ button: "", show: "" });
      } else {
        if (dataPendaftaran.tipeacara === "gratis") {
          setShowWarningPendaftaran("d-none");
          setShowPendaftaran({ button: "", show: "d-none" });
          setShowLokasi({ button: "", show: "" });
        } else {
          setShowWarningPendaftaran("");
          setShowPendaftaran({ button: "", show: "" });
          setShowLokasi({ button: "null", show: "d-none" });
        }
      }
    } else {
      setShowWarningPendaftaran("");
      setShowPendaftaran({ button: "", show: "" });
      setShowLokasi({ button: "null", show: "d-none" });
    }
  };

  const backtoJadwal = () => {
    if (dataPendaftaran.tipeacara && dataPendaftaran.linkdaftar) {
      if (dataPendaftaran.tipeacara === "bayar" && dataPendaftaran.biaya) {
        setShowPendaftaran({ button: "", show: "d-none" });
      } else {
        if (dataPendaftaran.tipeacara === "gratis") {
          setShowPendaftaran({ button: "", show: "d-none" });
        } else {
          setShowPendaftaran({ button: "null", show: "d-none" });
        }
      }
    } else {
      setShowPendaftaran({ button: "null", show: "d-none" });
    }
    setShowWarningPendaftaran("d-none");
    setShowJadwal({ button: "", show: "" });
  };

  //---------------------------------------------------------------------
  const [dataLokasi, setDataLokasi] = useState({});
  const [showLokasi, setShowLokasi] = useState({ button: "null", show: "d-none" });

  const [showWarningLokasi, setShowWarningLokasi] = useState("d-none");
  const setGeneralLokasi = () => {
    if (dataLokasi.kategori === "online" && dataLokasi.mediameet) {
      setShowWarningLokasi("d-none");
      setShowLokasi({ button: "", show: "d-none" });
      setShowReview({ button: "", show: "" });
    } else if (dataLokasi.kategori === "offline" && dataLokasi.tempat && dataLokasi.alamat) {
      setShowWarningLokasi("d-none");
      setShowLokasi({ button: "", show: "d-none" });
      setShowReview({ button: "", show: "" });
    } else {
      setShowWarningLokasi("");
      setShowLokasi({ button: "", show: "" });
      setShowReview({ button: "null", show: "d-none" });
    }
  };
  const backtoPendaftaran = () => {
    if (dataLokasi.kategori === "online" && dataLokasi.mediameet) {
      setShowLokasi({ button: "", show: "d-none" });
    } else if (dataLokasi.kategori === "offline" && dataLokasi.tempat && dataLokasi.alamat) {
      setShowLokasi({ button: "", show: "d-none" });
    } else {
      setShowLokasi({ button: "null", show: "d-none" });
    }
    setShowWarningLokasi("d-none");
    setShowPendaftaran({ button: "", show: "" });
  };

  //---------------------------------------------------------------------
  const [showReview, setShowReview] = useState({ button: "null", show: "d-none" });

  const uploadToDatabase = () => {
    const data = {
      eventName: dataGeneral.namaevent,
      eventImage: ketFoto.file,
      eventCategory: dataGeneral.kategori,
      benefits: dataGeneral.benefit,
      description: dataGeneral.deskripsi,
      eventDate: dataJadwal.tanggalevent,
      jamMulai: dataJadwal.jammulai,
      jamSelesai: dataJadwal.jamselesai,
      paymentType: dataPendaftaran.kategori,
      price: dataPendaftaran.biaya,
      registrationLink: dataPendaftaran.linkdaftar,
      instagram: dataPendaftaran.linkinstagram,
      facebook: dataPendaftaran.linkfacebook,
      twitter: dataPendaftaran.linktwitter,
      occurenceType: dataLokasi.kategori,
      mediaMeet: dataLokasi.mediameet,
      location: dataLokasi.tempat,
      address: dataLokasi.alamat,
    };
    console.log(data);
  };
  const backtoLokasi = () => {
    setShowReview({ button: "", show: "d-none" });
    setShowLokasi({ button: "", show: "" });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <div className={`item d-flex align-items-center ${showGeneral.button === "" ? "active" : ""}`}>
              <span>1</span>
              <p>General Info</p>
            </div>
            <div className={`item d-flex align-items-center ${showJadwal.button === "" ? "active" : ""}`}>
              <span>2</span>
              <p>Jadwal</p>
            </div>
            <div className={`item d-flex align-items-center ${showPendaftaran.button === "" ? "active" : ""}`}>
              <span>3</span>
              <p>Pendaftaran</p>
            </div>
            <div className={`item d-flex align-items-center ${showLokasi.button === "" ? "active" : ""}`}>
              <span>4</span>
              <p>Lokasi</p>
            </div>
            <div className={`item d-flex align-items-center ${showReview.button === "" ? "active" : ""}`}>
              <span>5</span>
              <p>Review</p>
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
                  <label htmlFor="namaLengkap">Nama Event</label>
                  <input type="text" className="form-control shadow-none mb-3" id="namaLengkap" name="namaLengkap" placeholder="Nama Event" onChange={(e) => setDataGeneral({ ...dataGeneral, namaevent: e.target.value })} />

                  <label htmlFor="kategori">Kategori Acara</label>
                  <select name="kategori" id="kategori" className="form-select mb-3" onChange={(e) => setDataGeneral({ ...dataGeneral, kategori: e.target.value })}>
                    <option value="">Pilih Kategori</option>
                    <option value="rpl">Rekayasa Perangkat Lunak</option>
                    <option value="jarkom">Jaringan Komputer</option>
                    <option value="mm">Multimedia</option>
                  </select>

                  <label htmlFor="benefits">Benefits</label>
                  <span className="d-block" style={{ fontSize: "11px" }}>
                    Pisahkan dengan <strong> Koma ','</strong> apabila benefits lebih dari 1
                  </span>
                  <input
                    type="text"
                    className="form-control shadow-none mb-3"
                    id="benefits"
                    name="benefits"
                    placeholder="Contoh: Ilmu, Snack, Relasi, Doorprize"
                    onChange={(e) => setDataGeneral({ ...dataGeneral, benefit: e.target.value })}
                  />

                  <label htmlFor="deskripsi">Deskripsi</label>
                  <textarea
                    type="text"
                    className="form-control shadow-none mb-3"
                    id="deskripsi"
                    name="deskripsi"
                    placeholder="Berikan Gambaran Event Maksimal 150 Kata"
                    maxLength="250"
                    onChange={(e) => setDataGeneral({ ...dataGeneral, deskripsi: e.target.value })}
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

              <label htmlFor="tanggalevent">Tanggal Pelaksanaan</label>
              <input type="date" className="form-control shadow-none mb-3" id="tanggalevent" name="tanggalevent" onChange={(e) => setDataJadwal({ ...dataJadwal, tanggalevent: e.target.value })} />

              <label htmlFor="jammulai">Jam Mulai</label>
              <input type="time" className="form-control shadow-none mb-3" id="jammulai" name="jammulai" onChange={(e) => setDataJadwal({ ...dataJadwal, jammulai: e.target.value })} />

              <label htmlFor="jamselesai">Jam Selesai</label>
              <input type="time" className="form-control shadow-none mb-3" id="namaLengkap" name="namaLengkap" onChange={(e) => setDataJadwal({ ...dataJadwal, jamselesai: e.target.value })} />
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
              <input type="radio" id="gratis" name="fav_language" value="gratis" onChange={(e) => setDataPendaftaran({ ...dataPendaftaran, tipeacara: e.target.value })} /> 
              <label htmlFor="gratis" className="me-4">
                Gratis
              </label>
              <input type="radio" id="bayar" name="fav_language" value="bayar" className="mb-3" onChange={(e) => setDataPendaftaran({ ...dataPendaftaran, tipeacara: e.target.value })} />  <label htmlFor="bayar">Berbayar</label>
              <br />
              {dataPendaftaran.tipeacara === "bayar" ? (
                <>
                  <label htmlFor="harga">Harga Tiket</label>
                  <input type="number" className="form-control shadow-none mb-3" id="harga" name="harga" placeholder="Harga Tiket" onChange={(e) => setDataPendaftaran({ ...dataPendaftaran, biaya: e.target.value })} />
                </>
              ) : (
                ""
              )}
              <label htmlFor="linkpendaftaran">Link Pendaftaran</label>
              <input
                type="text"
                className="form-control shadow-none mb-3"
                id="linkpendaftaran"
                name="linkpendaftaran"
                placeholder="Link Pendaftaran : bit.ly atau forms.gle dll"
                onChange={(e) => setDataPendaftaran({ ...dataPendaftaran, linkdaftar: e.target.value })}
              />
              <label htmlFor="instagram">Link Instagram</label>
              <input
                type="text"
                className="form-control shadow-none mb-3"
                id="instagram"
                name="instagram"
                placeholder="Link Instagram (Optional)"
                onChange={(e) => setDataPendaftaran({ ...dataPendaftaran, linkinstagram: e.target.value })}
              />
              <label htmlFor="facebook">Link Facebook</label>
              <input type="text" className="form-control shadow-none mb-3" id="facebook" name="facebook" placeholder="Link Facebook (Optional)" onChange={(e) => setDataPendaftaran({ ...dataPendaftaran, linkfacebook: e.target.value })} />
              <label htmlFor="twitter">Link Twitter</label>
              <input type="text" className="form-control shadow-none mb-3" id="twitter" name="twitter" placeholder="Link Twitter (Optional)" onChange={(e) => setDataPendaftaran({ ...dataPendaftaran, linktwitter: e.target.value })} />
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
              <select name="tipe" id="tipe" className="form-select mb-3" onChange={(e) => setDataLokasi({ ...dataLokasi, kategori: e.target.value })}>
                <option value="">Pilih Tipe Acara</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
              {dataLokasi.kategori === "online" ? (
                <>
                  <label htmlFor="harga">Pemilihan Tempat Meeting Online</label>
                  <select name="tipe" id="tipe" className="form-select mb-3" onChange={(e) => setDataLokasi({ ...dataLokasi, mediameet: e.target.value })}>
                    <option value="zoom">Zoom</option>
                    <option value="googlemeet">Google Meet</option>
                  </select>
                </>
              ) : (
                <>
                  <label htmlFor="tempat">Tempat</label>
                  <input type="text" className="form-control shadow-none mb-3" id="tempat" name="tempat" placeholder="Ex: Gedung A Lantai 10" onChange={(e) => setDataLokasi({ ...dataLokasi, tempat: e.target.value })} />
                  <label htmlFor="alamat">Alamat Lengkap Dari Tempat Acara</label>
                  <input type="text" className="form-control shadow-none mb-3" id="alamat" name="alamat" placeholder="Ex: Jalan Raya No 1, RT.01/01" onChange={(e) => setDataLokasi({ ...dataLokasi, alamat: e.target.value })} />
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
                <DetailEvent />
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-check-circle text-cyan" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                  </svg>
                  <p className="w-75 mx-auto mt-3" style={{ fontSize: "13px" }}>
                    Pastikan data sudah benar, Data yang sudah diupload tidak bisa dihapus
                  </p>
                  <p className="w-75 mx-auto mt-3">Apakah sudah yakin untuk Upload?</p>
                  <Button isPrimary className="w-100 fs-5" onClick={uploadToDatabase}>
                    Ya, Saya yakin
                  </Button>
                </div>
              </ModalElement>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
