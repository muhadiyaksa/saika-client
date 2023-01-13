import React, { useState, useEffect } from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../element/Button";
import Card from "../element/Card";
import Axios from "axios";
import { rupiahFormats } from "../utils/numberFormat";
import Notfound from "../parts/Notfound";

export default function List() {
  const [dataEvent, setDataEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [qtyCurrent, setQtyCurrent] = useState({ qty: 2, current: 1 });
  const [valueSelect, setValueSelect] = useState({ category: "DEFAULT", paymentType: "DEFAULT" });
  const [valueSearch, setValueSearch] = useState("DEFAULT");

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3001/event/filter?category=${valueSelect.category}&paymentType=${valueSelect.paymentType}&qty=${qtyCurrent.qty}&current=${qtyCurrent.current}&key=${valueSearch}`,
    })
      .then((result) => {
        console.log(result.data);
        setDataEvent(result.data);
        setIsLoading(false);
        setNotFound(false);
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
      });
  }, [valueSelect.category, valueSelect.paymentType, qtyCurrent.current, qtyCurrent.qty, valueSearch]);

  const GotoSearch = () => {
    const inputSearch = document.querySelector(".list .input-group input");
    setIsLoading(true);
    if (inputSearch.value !== "") {
      setValueSearch(inputSearch.value);
    } else {
      setValueSearch("DEFAULT");
    }
  };

  const tampilEvent = () => {
    if (dataEvent.events?.length !== 0) {
      console.log(dataEvent.events);
      let data = dataEvent.events?.map((el) => {
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
      return data;
    }
  };

  const selectForCategory = (e) => {
    setIsLoading(true);
    setValueSelect({ ...valueSelect, category: e.target.value });
  };
  const selectForPayment = (e) => {
    setIsLoading(true);
    setValueSelect({ ...valueSelect, paymentType: e.target.value });
  };
  console.log(qtyCurrent);
  const tampilPagination = () => {
    if (!notFound) {
      let data = [];
      for (let i = 1; i <= dataEvent?.totalPagination; i++) {
        data.push(i);
      }
      let element = data.map((el) => {
        return (
          <li className={`page-item ${dataEvent?.current === el ? "active" : ""}`}>
            <Button className="page-link bg-dongker shadow-none" onClick={() => setQtyCurrent({ ...qtyCurrent, current: el })}>
              {el}
            </Button>
          </li>
        );
      });
      return (
        <nav className="d-flex align-items-center justify-content-end">
          <ul className="pagination ">
            <select className="bg-dongker text-white border-0 rounded px-2  me-4" style={{ fontSize: "12px" }} onChange={(e) => setQtyCurrent({ current: 1, qty: +e.target.value })} defaultValue={qtyCurrent.qty}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
            <li className="page-item disabled">
              <Button
                className={`page-link bg-dongker shadow-none ${dataEvent?.current === 1 ? "disabled" : ""}`}
                onClick={() => setQtyCurrent({ ...qtyCurrent, current: qtyCurrent.current === 1 ? qtyCurrent.curret : qtyCurrent.current - 1 })}
              >
                <span aria-hidden="true">&laquo;</span>
              </Button>
            </li>
            {element}

            <li className="page-item">
              <Button
                className={`page-link bg-dongker shadow-none ${dataEvent?.current === dataEvent?.totalPagination ? "disabled" : ""}`}
                onClick={() => setQtyCurrent({ ...qtyCurrent, current: qtyCurrent.current >= dataEvent?.totalPagination ? qtyCurrent.current : qtyCurrent.current + 1 })}
              >
                <span aria-hidden="true">&raquo;</span>
              </Button>
            </li>
          </ul>
        </nav>
      );
    } else {
      return "";
    }
  };
  return (
    <>
      <Header />
      <section className="list mt-3 " style={{ marginBottom: "70px" }}>
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
            <div className="col-auto ">
              <Button isPrimary className="rounded-3 px-3 px-md-4 text-decoration-none" style={{ paddingTop: "10px", paddingBottom: "10px" }} type="link" href="/addevent">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg d-inline-block d-md-none" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg>
                <span className="d-none d-md-inline-block">Tambah Acara</span>
              </Button>
            </div>
            <div className="col">
              <div className="input-group w-100 ">
                <input
                  type="text"
                  id="search-pesanan"
                  className="form-control input-dongker  shadow-none  "
                  placeholder="Cari Judul Acara atau Penyelenggara"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  style={{ fontSize: "13px" }}
                  required
                  onChange={GotoSearch}
                />
                <Button isPrimary type="submit" className="py-2 px-4 border-0" id="basic-addon2" onClick={GotoSearch}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-0 col-lg-7 "></div>
            <div className="col-12 col-lg-5 d-flex  justify-content-end">
              <select name="kategori" id="kategori" className="bg-dongker text-white border-0 rounded w-25 px-2 py-2 me-4 " style={{ fontSize: "13px" }} onChange={selectForCategory}>
                <option value="DEFAULT">Pilih Kategori</option>
                <option value="rpl">Rekayasa Perangkat Lunak</option>
                <option value="jarkom">Jaringan Komputer</option>
                <option value="mm">Multimedia</option>
              </select>
              <select name="biaya" id="biaya" className="bg-dongker text-white border-0 rounded px-2 py-2  " style={{ fontSize: "13px" }} onChange={selectForPayment}>
                <option value="DEFAULT">Pilih Tipe Biaya</option>
                <option value="gratis">Gratis</option>
                <option value="bayar">Berbayar</option>
              </select>
            </div>
          </div>

          {notFound ? <Notfound /> : <div className="container-grid mt-5">{tampilEvent()}</div>}
          {tampilPagination()}
        </div>
      </section>
      <Footer />
    </>
  );
}
