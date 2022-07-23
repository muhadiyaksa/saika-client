import React from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import rpl from "../assets/image/rpl.png";
import mm from "../assets/image/multimedia.png";
import jarkom from "../assets/image/jarkom.png";
import Button from "../element/Button";
export default function SearchFriends() {
  return (
    <>
      <Header />
      <section className="findfriend py-5">
        <div class="container">
          <div className="row">
            <div className="col text-center">
              <p className="judul-1 text-cyan">Pilihan Teman Informatika</p>
              <p className="judul-2">Berikut Tema yang Disediakan </p>
              <div className="keterangan-1">
                <p>Pilihlah satu dari 3 tema berikut ini untuk menemukan teman Informatikamu yang sesuai</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md">
              <div class="tema text-center shadow  py-4 mb-3">
                <p className="judul-1 text-cyan">Multimedia</p>
                <img src={mm} alt="Multimedia" />
                <Button isPrimary isAnimation>
                  Cari Teman
                </Button>
              </div>
            </div>
            <div class="col-md">
              <div class="tema text-center shadow  py-4 mb-3">
                <p className="judul-1 text-cyan">Rekayasa Perangkat Lunak</p>
                <img src={rpl} alt="Rekayasa Perangkat Lunak" />
                <Button isPrimary isAnimation>
                  Cari Teman
                </Button>
              </div>
            </div>
            <div class="col-md">
              <div class="tema text-center shadow  py-4 mb-3">
                <p className="judul-1 text-cyan">Jaringan Komputer</p>
                <img src={jarkom} alt="Jaringan Komputer" />
                <Button isPrimary isAnimation>
                  Cari Teman
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
