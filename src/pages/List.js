import React, { useState, useEffect } from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../element/Button";
import iconSearch from "../assets/icon/icon-search.png";
import Card from "../element/Card";
import Axios from "axios";
import { rupiahFormats } from "../utils/numberFormat";
export default function List() {
  let navigate = useNavigate();

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const [dataEvent, setDataEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const TampilData = () => {
      setIsLoading(true);
      Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:3001/event/all`,
      }).then((result) => {
        console.log(result.data);
        setDataEvent(result.data);
        setIsLoading(false);
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
            <Card
              linkUrl={`/detail/${el.eventId}`}
              imgSrc={el.eventImage}
              judul={el.eventName}
              penyelenggara={el.institution}
              kategori={el.eventCategory.toUpperCase()}
              waktu={el.eventDate}
              paymentType={el.paymentType}
              price={rupiahFormats(el.price)}
            />
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
      <section className="list mt-3 mb-5">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p className="judul-1 text-cream">Pilihan Kegiatanmu</p>
              {/* <p className="judul-2">Webinar Khusus Anak Informatika </p> */}
              <div className="keterangan-1 text-softwhite">
                <p>Berikut merupakan beberapa acara kegiatan webinar dari beberapa lembaga yang dapat diikuti baik secara gratis maupun berbayar</p>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-auto">
              <Button isPrimary className="rounded-3 text-decoration-none" style={{ paddingTop: "10px", paddingBottom: "10px" }} type="link" href="/addevent">
                Tambah Acara
              </Button>
            </div>
            <div className="col">
              <div className="input-group w-100 ">
                <input
                  type="text"
                  id="search-pesanan"
                  className="form-control input-dongker "
                  placeholder="Cari Judul Acara atau Penyelenggara"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  style={{ fontSize: "13px" }}
                  required
                />
                <Button isPrimary type="submit" className="input-group-text  " id="basic-addon2" onClick={GotoSearch}>
                  <img src={iconSearch} alt="Search" />
                </Button>
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
          <div className="container-grid mt-5">
            <div className="item column-12 row-1 text-center">
              <p>Ini Hanya Event Dummy</p>
            </div>

            {tampilEvent()}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
