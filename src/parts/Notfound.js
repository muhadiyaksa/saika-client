import React from "react";
import Button from "../element/Button";
export default function notfound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3 mb-5 notfound">
      <div className="image">
        <img src="/image/404.svg" alt="" />
      </div>
      <span className="text-softwhite">Data yang kamu cari tidak ada.</span>
    </div>
  );
}
