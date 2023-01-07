import React from "react";
import propTypes from "prop-types";
import { changeDateFormat } from "../../utils/numberFormat";
import "./index.scss";

export default function Card(props) {
  return (
    <a href={props.linkUrl} className="text-decoration-none text-dark">
      <div className="card ">
        <div className="kategori">
          <span>{props.kategori}</span>
        </div>
        <div class="image">
          <img src={props.imgSrc} className="card-img-top" />
        </div>
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="mb-0">{props.judul}</h5>
            <p className="text-cream m-0">By {props.penyelenggara}</p>
          </div>
          <div class="d-inline-flex justify-content-between">
            <span style={{ fontSize: "13px" }} className={`${props.paymentType === "gratis" ? "bg-cream" : "bg-light"} px-2 rounded text-dongker fw-bolder text-capitalize`}>
              {props.paymentType === "bayar" ? "Rp " + props.price : props.paymentType}
            </span>
            <span style={{ fontSize: "13px" }}>{changeDateFormat(props.waktu)}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
Card.propTypes = {
  imgSrc: propTypes.string,
  judul: propTypes.string,
  penyelenggara: propTypes.string,
  waktu: propTypes.string,
  linkUrl: propTypes.string,
  kategori: propTypes.string,
  paymentType: propTypes.string,
  price: propTypes.string,
};
