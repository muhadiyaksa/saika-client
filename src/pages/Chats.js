import React from "react";
import mm from "../assets/image/multimedia.png";
import Button from "../element/Button";

export default function Chats() {
  return (
    <section className="chats">
      <div class="container">
        <div class="box">
          <div class="row ">
            <div class="col d-flex align-items-center">
              <span class="red"></span>
              <span>Live Sedang Berlangsung</span>
            </div>
            <div class="col text-end">
              <button className="btn btn-outline-danger">Akhiri Sesi</button>
            </div>
          </div>
        </div>
        <div class="friends">
          <p className="judul-1 ">Topik Live Sesi</p>
          <div class="text-center">
            <img src={mm} alt="" className="img-fluid" />
          </div>
          <p className="judul-1 mt-3">Daftar Anggota</p>
          <div class="list-friends">
            <div class="item-friends">
              <div class="image">
                <img src="" alt="" />
              </div>
              <div class="friend">
                <p className="p-0 m-0">Saya</p>
                <Button type="link" href="/" className="text-dark">
                  @enolmunjul
                </Button>
              </div>
              <div class="add">
                <Button className="btn btn-outline-cyan">+ Teman</Button>
              </div>
            </div>
            <div class="item-friends">
              <div class="image">
                <img src="" alt="" />
              </div>
              <div class="friend">
                <p className="p-0 m-0">Saya</p>
                <Button type="link" href="/" className="text-dark">
                  @enolmunjul
                </Button>
              </div>
              <div class="add">
                <Button className="btn btn-outline-cyan">+ Teman</Button>
              </div>
            </div>
            <div class="item-friends">
              <div class="image">
                <img src="" alt="" />
              </div>
              <div class="friend">
                <p className="p-0 m-0">Saya</p>
                <Button type="link" href="/" className="text-dark">
                  @enolmunjul
                </Button>
              </div>
              <div class="add">
                <Button className="btn btn-outline-cyan">+ Teman</Button>
              </div>
            </div>
            <div class="item-friends">
              <div class="image">
                <img src="" alt="" />
              </div>
              <div class="friend">
                <p className="p-0 m-0">Saya</p>
                <Button type="link" href="/" className="text-dark">
                  @enolmunjul
                </Button>
              </div>
              <div class="add">
                <Button className="btn btn-outline-cyan">+ Teman</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
