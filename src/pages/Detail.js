import React from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import Button from "../element/Button";
import Instagram from "../assets/icon/instagram.png";
import Facebook from "../assets/icon/facebook.png";
import Twitter from "../assets/icon/twitter.png";
import Card from "../element/Card";
export default function Detail() {
  return (
    <>
      <Header />
      <section className="detail">
        <div class="container">
          <p className="border-bottom mt-4 pb-2 fw-bold">
            <Button type="link" href="/search">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-circle text-secondary me-3" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                />
              </svg>
            </Button>
            Detail Webinar
          </p>
          <div class="row">
            <div class="col-md-4">
              <div class="image">
                <img src="/image/section2-1.png" alt="" />
              </div>
            </div>
            <div class="col-md">
              <p className="judul-1">IT How To Be Professional Software Engineer</p>
              <div class="row mt-3">
                <div class="col-md">
                  <p className="fw-bold mb-0 pb-0">Kategori Acara</p>
                  <p>Rekayasa Perangkat Lunak</p>
                </div>
                <div class="col-md">
                  <p className="fw-bold mb-0 pb-0">Benefit</p>
                  <p>Ilmu Bermanfaat, Relasi Teman</p>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md">
                  <p className="fw-bold mb-0 pb-0">Tipe Acara</p>
                  <p>Gratis</p>
                </div>
                <div class="col-md">
                  <p className="fw-bold mb-0 pb-0">Link Pendaftaran</p>
                  <p>
                    <Button type="link" href="" className="text-cyan">
                      https://asda
                    </Button>
                  </p>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md">
                  <p className="fw-bold mb-0 pb-0">Pelaksanaan</p>
                  <p>Online</p>
                </div>
                <div class="col-md">
                  <p className="fw-bold mb-0 pb-0">Media Sosial</p>
                  <div class="social d-flex align-items-center mt-2">
                    <Button type="link" href="/">
                      <img src={Instagram} alt="" />
                    </Button>
                    <Button type="link" href="/" className="mx-3">
                      <img src={Facebook} alt="" />
                    </Button>
                    <Button type="link" href="/">
                      <img src={Twitter} alt="" />
                    </Button>
                  </div>
                </div>
              </div>
              <p className="fw-bold mb-0 pb-0 mt-3">Deskripsi</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore libero alias facere voluptas quisquam, officia harum voluptate dicta repellat adipisci totam laudantium maiores aspernatur quasi maxime voluptatum? Cumque
                voluptatum incidunt reiciendis totam, quae blanditiis unde doloremque repudiandae distinctio odio quibusdam voluptas mollitia rem laborum, non consectetur praesentium ullam recusandae aspernatur, similique velit! Temporibus
                porro recusandae accusantium harum ipsa illum optio alias nihil atque, dicta molestias veritatis doloribus laboriosam repudiandae impedit molestiae placeat hic adipisci aliquid. Qui, vero aperiam placeat accusamus dolores
                debitis a ipsa laudantium laboriosam perspiciatis necessitatibus, delectus, magnam voluptatibus. Dolores itaque odit tempore optio, consequatur dicta? Nam, aliquid?
              </p>
            </div>
          </div>
          <div class="another-event">
            <p className="border-bottom mt-4 pb-2 fw-bold">Rekomendasi Acara Lain</p>
            <div class="container-grid">
              <div class="item column-3 row-1">
                <Card linkUrl={"/detail/asdadwkmwae"} imgSrc={"/image/section2-1.png"} judul={"IT Front End Developer"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
              </div>
              <div class="item column-3 row-1">
                <Card linkUrl={"/detail/asdadwkmwae"} imgSrc={"/image/section2-1.png"} judul={"IT Front End Developer"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
              </div>
              <div class="item column-3 row-1">
                <Card linkUrl={"/detail/asdadwkmwae"} imgSrc={"/image/section2-1.png"} judul={"IT Front End Developer"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
              </div>
              <div class="item column-3 row-1">
                <Card linkUrl={"/detail/asdadwkmwae"} imgSrc={"/image/section2-1.png"} judul={"IT Front End Developer"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
