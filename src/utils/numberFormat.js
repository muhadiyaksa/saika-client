function numberFormat(number) {
  const formatNumbering = new Intl.NumberFormat("id-ID");
  return formatNumbering.format(number);
}
function namesOfMonth(localeName = "id-ID", monthFormat = "long") {
  const format = new Intl.DateTimeFormat(localeName, { month: monthFormat }).format;
  return [...Array(12).keys()].map((m) => format(new Date(Date.UTC(2021, m))));
}
const namesOfMonthLocal = (localeName = "id-ID", monthFormat = "long") => {
  const format = new Intl.DateTimeFormat(localeName, { month: monthFormat }).format;
  return [...Array(12).keys()].map((m) => format(new Date(Date.UTC(2022, m))));
};
const namesOfMonthOut = (localeName = "en-US", monthFormat = "long") => {
  const format = new Intl.DateTimeFormat(localeName, { month: monthFormat }).format;
  return [...Array(12).keys()].map((m) => format(new Date(Date.UTC(2022, m))));
};
function getNamesMonth(indeks, zona) {
  let arrayMonth = namesOfMonth();
  let bulan = "";

  arrayMonth.forEach((el, i) => {
    if (i === indeks) {
      bulan = el;
    }
  });

  return bulan;
}
const namesSetMonth = (indeks, zona) => {
  let arrayMonthLocal = namesOfMonthLocal();
  let arrayMonth = namesOfMonthOut();
  let bulan = "";
  if (zona === "en-US") {
    arrayMonth.forEach((el, i) => {
      if (i === indeks) {
        bulan = el;
      }
    });
  } else {
    arrayMonthLocal.forEach((el, i) => {
      if (i === indeks) {
        bulan = el;
      }
    });
  }
  return bulan;
};

const setIndeksHours = (hours) => {
  if (hours.length === 1) {
    return `0${hours}`;
  } else {
    return `${hours}`;
  }
};

function rupiahFormats(angka, prefix) {
  let number_string = angka.replace(/[^,\d]/g, "").toString(), //ngereplace isian yang bukan angka jadi kosong
    split = number_string.split(","), // ["12344"]
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa), // 12
    ribuan = split[0].substr(sisa).match(/\d{3}/gi); //344 // carikan gua angka , lalu pecah jadi 3 length dan buat dia dalam array

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}

function changeDateFormat(date) {
  if (date) {
    let dataPisah = date?.split("-");
    let months = namesOfMonth();
    let namaBulan = months[+dataPisah[1] - 1];

    return `${dataPisah[2]} ${namaBulan} ${dataPisah[0]}`;
  } else {
    return "";
  }
}

const returnFormatDate = () => {
  let bulan = new Date().getMonth();
  let tahun = new Date().getFullYear();
  let tanggal = new Date().getDate();
  let jam = new Date().getHours();
  let menit = new Date().getMinutes();
  let tanggalKirim = `${tanggal} ${namesSetMonth(bulan, "id-ID")} ${tahun}`;
  let jamKirim = `${setIndeksHours(jam.toString())}:${setIndeksHours(menit.toString())}`;

  return { tanggalKirim, jamKirim };
};
module.exports = { numberFormat, namesOfMonth, getNamesMonth, rupiahFormats, changeDateFormat, returnFormatDate };
