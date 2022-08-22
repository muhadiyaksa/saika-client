import React from "react";
import propTypes from "prop-types";
import "./index.scss";

export default function Card(props) {
  return (
    <a href={props.linkUrl} className="text-decoration-none text-dark">
      <div className="card mb-3">
        <div className="kategori">
          <span>RPL</span>
        </div>
        <img src={props.imgSrc} className="card-img-top" />
        <div className="card-body">
          <p>
            <b>{props.judul}</b>
          </p>
          <p>
            {props.penyelenggara} | {props.waktu}
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
};
