import React from "react";
import Header from "../parts/Header";
import Card from "../element/Card";
import Button from "../element/Button";
import Footer from "../parts/Footer";
// import ImgLandingPage from "../assets/image/landingpage.png";
export default function Landingpage() {
  const getCursorShadow = (e) => {
    const imageEl = document.querySelector("#section-1 .image");
    const imageElShadow = document.querySelector("#section-1 .image .shadowImg");
    let dataC = imageEl.getBoundingClientRect();
    let dataX = e.clientX - dataC.left;
    let dataY = e.clientY - dataC.top;
    let height2 = imageElShadow.clientHeight / 2;
    let width2 = imageElShadow.clientWidth / 2;

    if (dataX <= imageEl.clientWidth / 2 && dataY <= imageEl.clientHeight / 2) {
      //10 < 300/2 = true , 10 < 250/2 = true
      imageElShadow.style.right = `${imageEl.clientWidth - dataX - width2}px`;
      imageElShadow.style.bottom = `${imageEl.clientHeight - dataY - height2}px`;
      imageElShadow.style.left = "0px";
      imageElShadow.style.top = "0px";
    } else if (dataX <= imageEl.clientWidth / 2 && dataY >= imageEl.clientHeight / 2) {
      imageElShadow.style.left = "0px";
      imageElShadow.style.bottom = "0px";
      imageElShadow.style.right = `${imageEl.clientWidth - dataX - width2}px`;
      imageElShadow.style.top = `${dataY - height2}px`;
    } else if (dataX >= imageEl.clientWidth / 2 && dataY <= imageEl.clientHeight / 2) {
      imageElShadow.style.left = "0px";
      imageElShadow.style.top = "0px";
      imageElShadow.style.left = `${dataX - width2}px`;
      imageElShadow.style.bottom = `${imageEl.clientHeight - dataY - height2}px`;
    } else {
      imageElShadow.style.left = "0px";
      imageElShadow.style.bottom = "0px";
      imageElShadow.style.left = `${dataX - width2}px`;
      imageElShadow.style.top = `${dataY - height2}px`;
    }
  };

  const getDefaultPosition = () => {
    const imageElShadow = document.querySelector("#section-1 .image .shadowImg");
    imageElShadow.style.inset = "0px";
    imageElShadow.style.margin = "auto";
  };

  const cutWords = (param) => {
    let data = param.split(" ");
    if (data.length > 9) {
      return data.splice(0, 9).concat("...").join(" ");
    } else {
      return param;
    }
  };
  return (
    <>
      <Header />
      <section id="section-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md text-center">
              <div className="image" onMouseMove={getCursorShadow} onMouseLeave={getDefaultPosition}>
                <div class="shadowImg d-none d-lg-block"></div>
                <div class="span span1 d-none d-lg-block">Teman</div>
                <div class="span span2 d-none d-lg-block">Pengetahuan</div>
                <div class="span span3 d-none d-lg-block">Jaringan</div>
                <img src="/image/section1-chat.png" alt="hero" />
              </div>
            </div>
            <div className="col-md text-center text-md-start">
              <p className="judul-1 text-cream d-none d-sm-block">Pilihan Saika</p>
              <p className="d-sm-none text-cream mb-4" style={{ fontSize: "13px" }}>
                Temukan Teman Dan Berkomunikasi <br></br>Secara REALTIME sekarang.
              </p>
              <p className="judul-2 d-none d-sm-block text-cream">
                Temukan Sahabat <br /> Informatikamu Disini
              </p>
              <p className="keterangan-section1 mb-4 d-none d-sm-block ket text-white">Temukan Teman dan Berkomunikasi secara REALTIME dengan orang-orang baru yang memiliki ketertarikan terhadap dunia Informatika.</p>
              <Button isPrimary className="mb-3 text-decoration-none " type="link" href="/find">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-right-dots me-3" viewBox="0 0 16 16">
                  <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                  <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                Cari Teman
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="section-2">
        <div className="container">
          <div className="row mb-4">
            <div className="col text-center">
              <p className="d-sm-none mb-4 d-inline-flex text-white text-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-calendar2-event-fill me-3 text-cream" viewBox="0 0 16 16">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM11.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
                </svg>
                <span>
                  Cari Kegiatan Pengembangan Diri Seputar <span className="text-cream fw-bold">Informatika</span>
                </span>
              </p>
              <p className="judul-1 text-cream d-none d-sm-block mb-2">Pilihan Kegiatanmu</p>
              <p className="judul-2 d-none text-cream d-sm-block mb-0">Berikut Beberapa Kegiatan Pengembangan Diri</p>
              <div className="keterangan-1 d-none d-sm-block text-center">
                <p className="mx-auto ket text-white">Temukan acara kegiatan Pengembangan Diri seperti Webinar, Workshop, talkshow dan lain-lain khusus tema Informatika</p>
              </div>
            </div>
          </div>
          <div className="container-grid">
            <div className="item column-3 row-1">
              <Card linkUrl={"/"} imgSrc={"/image/section2-1.png"} judul={cutWords("It Security Fundamentals UNUSIA")} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} kategori={"RPL"} />
            </div>
            <div className="item column-3 row-1">
              <Card linkUrl={"/"} imgSrc={"/image/acara2.png"} judul={cutWords("Peranan K3 Menghadapi Era Industri 4.0")} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} kategori={"RPL"} />
            </div>
            <div className="item column-3 row-1">
              <Card linkUrl={"/"} imgSrc={"/image/acara3.png"} judul={cutWords("Creative With Technology, To Become Enterpreneuer")} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} kategori={"MM"} />
            </div>
            <div className="item column-3 row-1 d-md-none d-lg-block">
              <Card linkUrl={"/"} imgSrc={"/image/acara4.png"} judul={cutWords("Strategi Startup dan Industri di masa Pandemi")} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} kategori={"RPL"} />
            </div>
          </div>

          <div className="row d-flex justify-content-center">
            <Button isPrimary className="mx-auto mt-4  text-decoration-none text-center" type="link" href="/search" style={{ width: "180px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar4-event me-3" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" />
                <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
              </svg>
              Lihat Lainnya
            </Button>
          </div>
        </div>
      </section>

      <section id="section-3">
        <div className="container">
          <div className="row flex-column-reverse flex-md-row align-items-center">
            <div className="col-md text-center text-md-start">
              <p className="judul-1 text-cream d-sm-none mb-3">
                Jadikan SAIKA <br />
                Sebagai Media Partner Mu
              </p>
              <p className="judul-1 text-cream d-none d-sm-block">Tambah Acara</p>
              <h2 className="judul-2  d-none d-sm-block">
                Jadikan <span>Saika</span> sebagai <span>Media Parner Mu</span> dan jangkau teman informatika
              </h2>
              <p className="ket mb-4 ">Daftar dan lampirkan Kegiatanmu dan jadikan saika sebagai media partner untuk mempromosikan acaramu, proses pendaftaran ini tidak dipungut biaya </p>
              <Button isPrimary className="mx-auto text-decoration-none text-center " type="link" href="/addevent">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle me-3" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                Daftar Sekarang
              </Button>
            </div>
            <div className="col-md d-flex justify-content-center">
              <div className="image">
                <img src="/image/section-3.svg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// <section id="section-4">
// <div className="container">
//   <div className="row">
//     <div className="col text-center">
//       <p className="judul-1 text-cyan">Pilihan BacaanMu</p>
//       <p className="judul-2">Blog yang dapat kamu kunjungi</p>
//       <div className="keterangan-1">
//         <p>Berikut merupakan beberapa Blog pilihan SAIKA dari internet yang bisa kamu kunjungi untuk menambah Bacaanmu</p>
//       </div>
//     </div>
//   </div>
//   <div className="container-grid">
//     <div className="item column-4 row-1">
//       <div className="card">
//         <img src="/image/section4.png" className="card-img-top" />
//         <div className="card-body">
//           <p>
//             <b>It Security Fundamentals UNUSIA</b>
//           </p>
//           <span style={{ fontSize: "14px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rem animi qui non nemo maiores fugit consequatur quam. Aperiam, minima.</span>
//           <Button type="link" href="/" className="text-dark" style={{ fontSize: "14px" }}>
//             Lihat Selengkapnya
//           </Button>
//         </div>
//       </div>
//     </div>
//     <div className="item column-4 row-1">
//       <div className="card">
//         <img src="/image/section4.png" className="card-img-top" />
//         <div className="card-body">
//           <p>
//             <b>It Security Fundamentals UNUSIA</b>
//           </p>
//           <span style={{ fontSize: "14px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rem animi qui non nemo maiores fugit consequatur quam. Aperiam, minima.</span>
//           <Button type="link" href="/" className="text-dark" style={{ fontSize: "14px" }}>
//             Lihat Selengkapnya
//           </Button>
//         </div>
//       </div>
//     </div>
//     <div className="item column-4 row-1">
//       <div className="card">
//         <img src="/image/section4.png" className="card-img-top" />
//         <div className="card-body">
//           <p>
//             <b>It Security Fundamentals UNUSIA</b>
//           </p>
//           <span style={{ fontSize: "14px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rem animi qui non nemo maiores fugit consequatur quam. Aperiam, minima.</span>
//           <Button type="link" href="/" className="text-dark" style={{ fontSize: "14px" }}>
//             Lihat Selengkapnya
//           </Button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </section>
