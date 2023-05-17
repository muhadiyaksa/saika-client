import React from "react";

export default function ListOfFriendsElement({ dataRoom, dataUser, userData, isLoggedIn, checkProfileUser, acceptFriend, rejectFriend, addFriend }) {
  if (dataRoom?.anggota !== undefined) {
    let dataFilter = dataRoom.anggota.filter((el) => el.iduser !== userData._id);
    let dataFilterListFriends = dataUser.listFriends ? dataUser.listFriends.map((el) => el.iduser) : [];
    let dataFilterListWaitingSend = dataUser.listWaitingSend ? dataUser.listWaitingSend.map((el) => el.iduser) : [];
    let dataFilterListWaitingReceive = dataUser.listWaitingReceive ? dataUser.listWaitingReceive.map((el) => el.iduser) : [];
    let dataFilterAnonymous = dataRoom.anggota.filter((el) => el.iduser.includes("anonymous")).map((el) => el.iduser);
    console.log(dataFilter);
    let data = dataFilter.map((el) => {
      if (isLoggedIn) {
        return (
          <div className="item-friends" key={el.iduser}>
            <div className="d-flex align-items-center">
              <div className="image me-lg-3 me-1">
                <img src={el.fotoUser === "" ? "/image/ava_user.jpg" : el.fotoUser} alt="" />
              </div>
              <div className="friend">
                {dataFilterAnonymous.includes(el.iduser) ? (
                  <p className="p-0 m-0 text-capitalize ">{el.iduser}</p>
                ) : (
                  <>
                    <p className="p-0 m-0 text-capitalize ">{el.namauser}</p>
                    <button iduser={el.iduser} className="btn p-0 text-decoration-underline text-cream shadow-none" onClick={checkProfileUser}>
                      @{el.usernameuser}
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="add">
              {dataFilterAnonymous.includes(el.iduser) ? (
                <span></span>
              ) : (
                <>
                  {dataFilterListFriends.includes(el.iduser) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                    </svg>
                  ) : (
                    <>
                      {dataFilterListWaitingReceive.includes(el.iduser) ? (
                        <div className="terima">
                          <button className="btn p-0 me-2 shadow-none" iduserreq={el.iduser} title="Terima Permintaan Pertemanan" onClick={acceptFriend}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-check-circle-fill text-cream" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                          </button>
                          <button className="btn p-0  shadow-none" iduserreq={el.iduser} title="Tolak Permintaan Pertemanan" onClick={rejectFriend}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" className="bi bi-x text-softwhite" viewBox="0 0 16 16">
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <>
                          {dataFilterListWaitingSend.includes(el.iduser) ? (
                            <div className="wait">
                              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-hourglass-split text-cream" viewBox="0 0 16 16">
                                <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                              </svg>
                            </div>
                          ) : (
                            <button className="btn btn-outline-cyan " iduserreq={el.iduser} onClick={addFriend}>
                              + <span className="d-none d-lg-inline-block">Teman</span>
                            </button>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div className="item-friends" key={el.iduser}>
            <div className="d-flex align-items-center">
              <div className="image me-lg-3 me-1">
                <img src="/image/ava_user.jpg" />
              </div>
              <div className="friend">
                <p className="p-0 m-0 text-capitalize ">
                  {el.iduser.includes("anonymous") ? (
                    `Anonymous${el.iduser.slice(8, 12)}`
                  ) : (
                    <>
                      Saika-{el.iduser.slice(8, 11).toUpperCase()}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-patch-check-fill ms-1 text-cream" viewBox="0 0 16 16">
                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                      </svg>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        );
      }
    });
    return data;
  }
}
