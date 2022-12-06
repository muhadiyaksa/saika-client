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
  return (
    <>
      <Header />
      <section id="section-1">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md text-center">
              <div className="image" onMouseMove={getCursorShadow} onMouseLeave={getDefaultPosition}>
                <div class="shadowImg d-none d-lg-block"></div>
                <div class="span span1 d-none d-lg-block">Find Friend</div>
                <div class="span span2 d-none d-lg-block">Find Network</div>
                <div class="span span3 d-none d-lg-block">Find Knowledge</div>
                <img src="/image/section1-chat.png" alt="hero" />
              </div>
            </div>
            <div className="col-md text-center text-md-start">
              <p className="judul-1 text-cream d-none d-sm-block">Pilihan Saika</p>
              <p className="d-sm-none text-cream mb-4">Temukan Teman Dan Berkomunikasi Secara REALTIME sekarang.</p>
              <p className="judul-2 d-none d-sm-block text-cream">
                Temukan Sahabat <br /> Informatikamu Disini
              </p>
              <p className="keterangan-section1 mb-4 d-none d-sm-block ket text-white">Temukan Teman dan Berkomunikasi secara REALTIME dengan orang-orang baru yang memiliki ketertarikan terhadap dunia Informatika.</p>
              <Button isPrimary className="mb-3 text-decoration-none " type="link" href="/find">
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
              <p className="d-sm-none mb-4 d-inline-flex text-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-calendar2-event-fill me-3 text-cyan" viewBox="0 0 16 16">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM11.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
                </svg>
                <span>
                  Cari Kegiatan Pengembangan Diri Seputar <span className="text-cyan fw-bold">Informatika</span>
                </span>
              </p>
              <p className="judul-1 text-cyan d-none d-sm-block mb-2">Pilihan Kegiatanmu</p>
              <p className="judul-2 d-none d-sm-block mb-0">Berikut Beberapa Kegiatan Pengembangan Diri</p>
              <div className="keterangan-1 d-none d-sm-block text-center">
                <p className="mx-auto ket">Temukan acara kegiatan Pengembangan Diri seperti Webinar, Workshop, talkshow dan lain-lain khusus tema Informatika</p>
              </div>
            </div>
          </div>
          <div className="container-grid">
            <div className="item column-3 row-1">
              <Card linkUrl={"/"} imgSrc={"/image/section2-1.png"} judul={"It Security Fundamentals UNUSIA"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
            </div>
            <div className="item column-3 row-1">
              <Card imgSrc={"/image/acara2.png"} judul={"Peranan K3 Menghadapi Era Industri 4.0"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
            </div>
            <div className="item column-3 row-1">
              <Card imgSrc={"/image/acara3.png"} judul={"Creative With Technology, To Become Enterpreneuer"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
            </div>
            <div className="item column-3 row-1 d-md-none d-lg-block">
              <Card imgSrc={"/image/acara4.png"} judul={"Strategi Startup dan Industri di masa Pandemi"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
            </div>
          </div>

          <div className="row d-flex justify-content-center">
            <Button isPrimary isAnimation className="mx-auto mt-4 text-white text-decoration-none text-center" type="link" href="/search" style={{ width: "180px" }}>
              Lihat Lainnya
            </Button>
          </div>
        </div>
      </section>

      <section id="section-3">
        <div className="container">
          <div className="row flex-column-reverse flex-md-row align-items-center">
            <div className="col-md text-center text-md-start">
              <p className="judul-1 text-cyan d-sm-none mb-3">
                Jadikan SAIKA <br />
                Sebagai Media Partner Mu
              </p>
              <p className="judul-1 text-cyan d-none d-sm-block">Tambah Acara</p>
              <h2 className="judul-2  d-none d-sm-block">
                Jadikan <span>Saika</span> sebagai <span>Media Parner Mu</span> dan jangkau teman informatika
              </h2>
              <p className="ket mb-4 ">Daftar dan lampirkan webinarmu dan jadikan saika sebagai media partner untuk mempromosikan acaramu, proses pendaftaran ini tidak dipungut biaya </p>
              <Button isPrimary isAnimation className="mx-auto text-decoration-none text-center text-white" type="link" href="/addevent">
                Daftar Sekarang
              </Button>
            </div>
            <div className="col-md d-flex justify-content-center">
              <div className="image">
                <img src="/image/section3.png" />
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
