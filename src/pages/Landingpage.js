import React from "react";

export default function Landingpage() {
  return (
    <>
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand text-center" href="#">
            <span>SAIKA</span>
            <br />
            Sahabat Informatika
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Beranda
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Acara
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Teman
                </a>
              </li>
            </ul>
            <div class="navbar-account">
              <a href="">
                <img src="/image/notification-icon.png" />
              </a>
              <a href="">
                <img class="mx-4" src="/image/profile-picture.png" />
              </a>
              <span class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </span>
            </div>
          </div>
        </div>
      </nav>

      <section id="section-1">
        <div class="container">
          <div class="row">
            <div class="col-lg d-flex justify-content-center">
              <img src="/image/section1.png" />
            </div>
            <div class="col-lg">
              <p class="judul-1">Pilihan Saika</p>
              <p class="judul-2">
                Temukan Sahabat
                <br />
                Informatikamu
              </p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor officiis pariatur explicabo vero laudantium eos consectetur natus modi fugiat sed.</p>
              <button class="btn-blue">Cari Teman</button>
            </div>
          </div>
        </div>
      </section>

      <section id="section-2">
        <div class="container">
          <div class="row">
            <div class="col text-center">
              <p class="judul-1">Pilihan Kegiatanmu</p>
              <p class="judul-2">Berikut Beberapa Kegiatan Webinar</p>
              <div class="keterangan-1">
                <p>Berikut merupakan beberapa acara kegitan webinar dari beberapa lembaga yang anda dapat ikuti baik acara secara gratis ataupun berbayar</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3">
              <div class="card">
                <img src="/image/section2-1.png" class="card-img-top" />
                <div class="card-body">
                  <p>
                    <b>It Security Fundamentals UNUSIA</b>
                  </p>
                  <p>Dicoding | 6 Juli 2021</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="card">
                <img src="/image/section2-1.png" class="card-img-top" />
                <div class="card-body">
                  <p>
                    <b>It Security Fundamentals UNUSIA</b>
                  </p>
                  <p>Dicoding | 6 Juli 2021</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="card">
                <img src="/image/section2-1.png" class="card-img-top" />
                <div class="card-body">
                  <p>
                    <b>It Security Fundamentals UNUSIA</b>
                  </p>
                  <p>Dicoding | 6 Juli 2021</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="card">
                <img src="/image/section2-1.png" class="card-img-top" />
                <div class="card-body">
                  <p>
                    <b>It Security Fundamentals UNUSIA</b>
                  </p>
                  <p>Dicoding | 6 Juli 2021</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row d-flex justify-content-center">
            <button class="btn-blue">Lihat Lainnya</button>
          </div>
        </div>
      </section>

      <section id="section-3">
        <div class="container">
          <div class="row">
            <div class="col-lg">
              <p class="judul-1">Tambah Acara</p>
              <h2 class="judul-2">
                Jadikan <span>Saika</span> sebagai <span>Media Parner Mu</span> dan jangkau teman informatika
              </h2>
              <p>Daftar dan lampirkan webinarmu dan jadikan saika sebagai media partner untuk mempromosikan acaramu, proses pendaftaran ini tidak dipungut biaya </p>
              <button class="btn-blue">Daftar Sekarang</button>
            </div>
            <div class="col-lg d-flex justify-content-center">
              <img src="/image/section3.png" />
            </div>
          </div>
        </div>
      </section>

      <section id="section-4">
        <div class="container">
          <div class="row">
            <div class="col text-center">
              <p class="judul-1">Pilihan Kegiatanmu</p>
              <p class="judul-2">Berikut Beberapa Kegiatan Webinar</p>
              <div class="keterangan-1">
                <p>Berikut merupakan beberapa acara kegitan webinar dari beberapa lembaga yang anda dapat ikuti baik acara secara gratis ataupun berbayar</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4">
              <div class="card">
                <img src="/image/section4.png" class="card-img-top" />
                <div class="card-body">
                  <p>
                    <b>It Security Fundamentals UNUSIA</b>
                  </p>
                  <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rem animi qui non nemo maiores fugit consequatur quam. Aperiam, minima.</span>
                  <span>Lihat Selengkapnya</span>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card">
                <img src="/image/section4.png" class="card-img-top" />
                <div class="card-body">
                  <p>
                    <b>It Security Fundamentals UNUSIA</b>
                  </p>
                  <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rem animi qui non nemo maiores fugit consequatur quam. Aperiam, minima.</span>
                  <span>Lihat Selengkapnya</span>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card">
                <img src="/image/section4.png" class="card-img-top" />
                <div class="card-body">
                  <p>
                    <b>It Security Fundamentals UNUSIA</b>
                  </p>
                  <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum rem animi qui non nemo maiores fugit consequatur quam. Aperiam, minima.</span>
                  <span>Lihat Selengkapnya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div class="container d-flex align-items-center py-3">
          <p class="footer-brand me-auto text-center">
            <span>Saika</span>
            <br />
            Sahabat Informatika
          </p>
          <img class="me-2" src="/image/copyright-icon.png" />
          <p class="footer-cr">2021 Saika. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
