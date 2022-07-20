import React from "react";
import Header from "../parts/Header";
import Card from "../element/Card";
import Button from "../element/Button";
import Footer from "../parts/Footer";
export default function Landingpage() {
  return (
    <>
      <Header />
      <section id="section-1">
        <div className="container">
          <div className="row align-items-center">
            <div class="col-md">
              <div class="image">
                <img src="/image/section1.png" />
              </div>
            </div>
            <div class="col-md text-center text-md-start">
              <p className="judul-1 text-cyan">Pilihan Saika</p>
              <p className="judul-2 ">
                Temukan Sahabat <br /> Informatikamu
              </p>
              <p className="keterangan-section1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor officiis pariatur explicabo vero laudantium eos consectetur natus modi fugiat sed.</p>

              <Button isPrimary isAnimation className="mb-3">
                Cari Teman
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="section-2">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p className="judul-1 text-cyan">Pilihan Kegiatanmu</p>
              <p className="judul-2">Berikut Beberapa Kegiatan Webinar</p>
              <div className="keterangan-1">
                <p>Berikut merupakan beberapa acara kegitan webinar dari beberapa lembaga yang anda dapat ikuti baik acara secara gratis ataupun berbayar</p>
              </div>
            </div>
          </div>
          <div class="container-grid">
            <div class="item column-3 row-1">
              <Card imgSrc={"/image/section2-1.png"} judul={"IT Front End Developer"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
            </div>
            <div class="item column-3 row-1">
              <Card imgSrc={"/image/section2-1.png"} judul={"IT Front End Developer"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
            </div>
            <div class="item column-3 row-1">
              <Card imgSrc={"/image/section2-1.png"} judul={"IT Front End Developer"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
            </div>
            <div class="item column-3 row-1 d-md-none d-lg-block">
              <Card imgSrc={"/image/section2-1.png"} judul={"IT Front End Developer"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
            </div>
          </div>

          <div className="row d-flex justify-content-center">
            <Button isPrimary isAnimation className="mx-auto mt-4" style={{ width: "180px" }}>
              Lihat Lainnya
            </Button>
          </div>
        </div>
      </section>

      <section id="section-3">
        <div className="container">
          <div className="row flex-column-reverse flex-md-row align-items-center">
            <div className="col-md text-center text-md-start">
              <p className="judul-1 text-cyan">Tambah Acara</p>
              <h2 className="judul-2">
                Jadikan <span>Saika</span> sebagai <span>Media Parner Mu</span> dan jangkau teman informatika
              </h2>
              <p>Daftar dan lampirkan webinarmu dan jadikan saika sebagai media partner untuk mempromosikan acaramu, proses pendaftaran ini tidak dipungut biaya </p>
              <Button isPrimary isAnimation className="mx-auto mt-4">
                Daftar Sekarang
              </Button>
            </div>
            <div className="col-md d-flex justify-content-center">
              <div class="image">
                <img src="/image/section3.png" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section-4 mb-5">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p className="judul-1 text-cyan">Pilihan BacaanMu</p>
              <p className="judul-2">Blog yang dapat kamu kunjungi</p>
              <div className="keterangan-1">
                <p>Berikut merupakan beberapa Blog pilihan SAIKA dari internet yang bisa kamu kunjungi untuk menambah Bacaanmu</p>
              </div>
            </div>
          </div>
          <div className="container-grid">
            <div className="item column-4 row-1">
              <div className="card">
                <img src="/image/section4.png" className="card-img-top" />
                <div className="card-body">
                  <p>
                    <b>It Security Fundamentals UNUSIA</b>
                  </p>
                  <span style={{ fontSize: "14px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rem animi qui non nemo maiores fugit consequatur quam. Aperiam, minima.</span>
                  <Button type="link" href="/" className="text-dark" style={{ fontSize: "14px" }}>
                    Lihat Selengkapnya
                  </Button>
                </div>
              </div>
            </div>
            <div className="item column-4 row-1">
              <div className="card">
                <img src="/image/section4.png" className="card-img-top" />
                <div className="card-body">
                  <p>
                    <b>It Security Fundamentals UNUSIA</b>
                  </p>
                  <span style={{ fontSize: "14px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rem animi qui non nemo maiores fugit consequatur quam. Aperiam, minima.</span>
                  <Button type="link" href="/" className="text-dark" style={{ fontSize: "14px" }}>
                    Lihat Selengkapnya
                  </Button>
                </div>
              </div>
            </div>
            <div className="item column-4 row-1">
              <div className="card">
                <img src="/image/section4.png" className="card-img-top" />
                <div className="card-body">
                  <p>
                    <b>It Security Fundamentals UNUSIA</b>
                  </p>
                  <span style={{ fontSize: "14px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rem animi qui non nemo maiores fugit consequatur quam. Aperiam, minima.</span>
                  <Button type="link" href="/" className="text-dark" style={{ fontSize: "14px" }}>
                    Lihat Selengkapnya
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
