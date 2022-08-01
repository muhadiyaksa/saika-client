import React, { useState, useEffect } from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../element/Button";
import iconSearch from "../assets/icon/icon-search.png";
import Card from "../element/Card";
import Axios from "axios";
export default function List() {
  let navigate = useNavigate();

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const [dataEvent, setDataEvent] = useState([]);
  useEffect(() => {
    const TampilData = () => {
      // let query = useQuery();
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/event`,
      }).then((result) => {
        console.log(result.data.Event);
        setDataEvent(result.data.Event);
      });
    };
    TampilData();
  }, []);

  console.log(dataEvent);

  const GotoSearch = () => {
    const inputSearch = document.querySelector(".list .input-group input");
    if (inputSearch.value !== "") {
      navigate(`/search?some=${inputSearch.value.toLowerCase()}`);
    }
  };

  const tampilEvent = () => {
    if (dataEvent.length !== 0) {
      let data = dataEvent.map((el) => {
        return (
          <div className="item column-3 row-1">
            <Card linkUrl={`/detail/${el._id}`} imgSrc={"/image/section2-1.png"} judul={el.eventName} penyelenggara={el.eventCategory} waktu={el.eventDate} />
          </div>
        );
      });
      console.log(data);
      return data;
    }
  };
  return (
    <>
      <Header />
      <section className="list mt-4">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p className="judul-1 text-cyan">Pilihan Kegiatanmu</p>
              <p className="judul-2">Webinar Khusus Anak Informatika </p>
              <div className="keterangan-1">
                <p>Berikut merupakan beberapa acara kegiatan webinar dari beberapa lembaga yang dapat diikuti baik secara gratis maupun berbayar</p>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-auto">
              <Button isPrimary className="rounded-3 text-white text-decoration-none" style={{ paddingTop: "10px", paddingBottom: "10px" }} type="link" href="/addevent">
                Tambah Acara
              </Button>
            </div>
            <div className="col">
              <div className="input-group w-100">
                <input type="text" id="search-pesanan" className="form-control " placeholder="Cari Judul Acara atau Penyelenggara" aria-label="Recipient's username" aria-describedby="basic-addon2" style={{ fontSize: "13px" }} required />
                <button type="submit" className="input-group-text btn border border-2" id="basic-addon2" onClick={GotoSearch}>
                  <img src={iconSearch} alt="Search" />
                </button>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-7"></div>
            <div className="col-5 d-flex">
              <select name="kategori" id="kategori" className="form-select me-4">
                <option value="">Pilih Kategori</option>
                <option value="rpl">Rekayasa Perangkat Lunak</option>
                <option value="jarkom">Jaringan Komputer</option>
                <option value="mm">Multimedia</option>
              </select>
              <select name="biaya" id="biaya" className="form-select">
                <option value="">Pilih Ketentuan Biaya</option>
                <option value="rpl">Gratis</option>
                <option value="jarkom">Berbayar</option>
              </select>
            </div>
          </div>
          <div className="container-grid mt-5">{tampilEvent()}</div>
        </div>
      </section>
      <Footer />
    </>
  );
}
