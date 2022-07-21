function numberFormat(number) {
  const formatNumbering = new Intl.NumberFormat("id-ID");
  return formatNumbering.format(number);
}
function namesOfMonth(localeName = "id-ID", monthFormat = "long") {
  const format = new Intl.DateTimeFormat(localeName, { month: monthFormat }).format;
  return [...Array(12).keys()].map((m) => format(new Date(Date.UTC(2021, m))));
}
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
module.exports = { numberFormat, namesOfMonth, getNamesMonth };
