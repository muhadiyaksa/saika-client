import React, { useEffect, useState } from "react";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
// import Card from "../element/Card";
import Button from "../element/Button";
import DetailEvent from "../parts/DetailEvent.js";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Notfound from "../parts/Notfound";
export default function Detail() {
  const param = useParams();

  const [dataDetail, setDataDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3001/event/single?id=${param.id}`,
    })
      .then((res) => {
        setIsLoading(false);
        if (res.data.status !== "failed") {
          setNotFound(false);
          setDataDetail(res.data);
        } else {
          setDataDetail({});
        }
      })
      .catch((err) => {
        setNotFound(true);
        setDataDetail({});
      });
  }, []);

  return (
    <>
      <Header />
      {notFound === true ? (
        <Notfound />
      ) : (
        <section className={`detail primary ${isLoading ? "loading" : ""}`}>
          <div className="container">
            <p className=" pt-4 pb-2 subjudul mb-5">
              <Button type="link" href="/search">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-circle text-cream me-3" viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                  />
                </svg>
              </Button>
              <span className="text-softwhite">Detail Acara</span>
            </p>
            <DetailEvent dataDetail={dataDetail} isLoading={isLoading} />
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
