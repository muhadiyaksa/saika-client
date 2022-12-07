import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container d-flex align-items-center py-3">
        <p className="footer-brand me-auto  ">
          <span>Saika</span>
          <br />
          Sahabat Informatika
        </p>
        <img className="me-2" src="/image/copyright-icon.png" />
        <p className="footer-cr">2021 Saika. All rights reserved.</p>
      </div>
    </footer>
  );
}
