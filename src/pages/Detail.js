import React, { useEffect, useState } from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import Card from "../element/Card";
import DetailEvent from "../parts/DetailEvent.js";
import { useParams } from "react-router-dom";
import Axios from "axios";
export default function Detail() {
  const param = useParams();
  console.log(param);
  // const [dataDetail, setDataDetail] = useState({});
  // useEffect(() => {
  //   Axios({
  //     method: "GET",
  //     withCredentials: true,
  //     url: `http://localhost:5000/event/62e40106f55b5764dad36f74`,
  //   }).then((res) => {
  //     console.log(res);
  //     setDataDetail(res.data.eventDetail);
  //   });
  // }, []);

  const data = {
    eventName: "How To Be Good UI/UX Designer",
    eventImage: "/image/section2-1.png",
    eventCategory: "rpl",
    benefits: "Ilmu yang bermanfaat, Snack, Sertifikat",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, dolor excepturi! Dolores repudiandae quod atque ratione eius, enim inventore, sed blanditiis, labore molestias quidem! In quos nemo odit obcaecati molestiae, perspiciatis, veritatis voluptatem enim nulla optio, quam ipsa illum autem hic aspernatur laborum laboriosam odio officia libero maxime recusandae ducimus earum! Eos nostrum laborum provident unde iusto corporis quod saepe quidem reprehenderit maxime obcaecati asperiores optio, dolorem rem aut error ducimus cum pariatur placeat? Velit eos in illo molestiae doloribus. Exercitationem eligendi beatae esse id itaque ipsam corrupti ipsum mollitia, quae, excepturi iusto dolore eaque accusamus vero. Placeat, quos eligendi.",
    eventDate: "25 Juli 2022",
    jamMulai: "09:00",
    jamSelesai: "11:00",
    paymentType: "gratis",
    price: "",
    registrationLink: "https://bit.ly/adasdad",
    instagram: "https://instagram.com/muhadiyaksa",
    facebook: "https://facebook.com/muhadiyaksa28",
    twitter: "https://twitter.com/muhadiyaksa",
    occurenceType: "offline",
    mediaMeet: "",
    location: "Gedung FKIP Aula Ahmad Dahlan Lantai 6",
    address: "Jl. Baru Pasar Rebo, Ciracas, Jakarta Timur",
  };
  return (
    <>
      <Header />
      <section className="detail primary">
        <div className="container">
          <DetailEvent dataDetail={data} />
          <div className="another-event">
            <p className="border-bottom pt-4 pb-2 fw-bold">Rekomendasi Acara Lain</p>
            <div className="container-grid">
              <div className="item column-3 row-1">
                <Card linkUrl={"/detail/123123"} imgSrc={"/image/section2-1.png"} judul={"It Security Fundamentals UNUSIA"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
              </div>
              <div className="item column-3 row-1">
                <Card linkUrl={"/detail/123123"} imgSrc={"/image/acara2.png"} judul={"Peranan K3 Menghadapi Era Industri 4.0"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
              </div>
              <div className="item column-3 row-1">
                <Card linkUrl={"/detail/123123"} imgSrc={"/image/acara3.png"} judul={"Creative With Technology, To Become Enterpreneuer"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
              </div>
              <div className="item column-3 row-1 d-md-none d-lg-block">
                <Card linkUrl={"/detail/123123"} imgSrc={"/image/acara4.png"} judul={"Strategi Startup dan Industri di masa Pandemi"} penyelenggara={"Dicoding"} waktu={"6 Juli 2022"} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
