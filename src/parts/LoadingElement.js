import React from "react";

export default function LoadingElement() {
  return (
    <div className="animasi-load mx-auto text-center mt-3">
      <div className="image mx-auto">
        <img src="/image/loading.svg" alt="" />
      </div>
      <p className="mt-4 mb-3">Mohon Ditunggu Beberapa Saat . . .</p>
      <div className="sahabat">
        <p>Loading</p>
      </div>
    </div>
  );
}
