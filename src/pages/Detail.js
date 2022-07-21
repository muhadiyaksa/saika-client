import React from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import Card from "../element/Card";
import DetailEvent from "../parts/DetailEvent.js";
export default function Detail() {
  return (
    <>
      <Header />
      <section className="detail primary">
        <div className="container">
          <DetailEvent />
          <div className="another-event">
            <p className="border-bottom mt-4 pb-2 fw-bold">Rekomendasi Acara Lain</p>
            <div className="container-grid">
              <div className="item column-3 row-1">
                <Card linkUrl={"/detail/asdadwkmwae"} imgSrc={"/image/section2-1.png"} judul={"IT Front End Developer"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
              </div>
              <div className="item column-3 row-1">
                <Card linkUrl={"/detail/asdadwkmwae"} imgSrc={"/image/section2-1.png"} judul={"IT Front End Developer"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
              </div>
              <div className="item column-3 row-1">
                <Card linkUrl={"/detail/asdadwkmwae"} imgSrc={"/image/section2-1.png"} judul={"IT Front End Developer"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
              </div>
              <div className="item column-3 row-1">
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
