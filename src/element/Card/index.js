import React from "react";
import propTypes from "prop-types";
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
          <h5>{props.judul}</h5>
          <p>
            {props.penyelenggara} | <span class="text-cream ">{props.waktu}</span>
          </p>
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
};
