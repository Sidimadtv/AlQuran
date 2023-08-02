import React, { useEffect, useState } from "react";
import "./Adhan.css";
import Nav from "../../nav/Nav";
import Loader from "../../../Loader";
import { Container } from "@mui/material";

const todaysDate = new Date();
function convertDate(date) {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 1).toString();
  var dd = date.getDate().toString();

  var mmChars = mm.split("");
  var ddChars = dd.split("");

  return (
    (ddChars[1] ? dd : "0" + ddChars[0]) +
    "-" +
    (mmChars[1] ? mm : "0" + mmChars[0]) +
    "-" +
    yyyy
  );
}

function Adhan() {
  const [address, setAddress] = useState({address: {city: "tunis", country: "tunis"}});
  const [data, setData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setAddress(data))
        .catch((err) => console.error(err));
    });
  }, []);

  useEffect(() => {
    if (address && address.address) {
      fetch(
        `https://api.aladhan.com/v1/timingsByCity/${convertDate(
          todaysDate
        )}?city=${address.address.city}&country=${
          address.address.country
        }&method=2`
      )
        .then((res) => res.json())
        .then((data) => setData(data.data))
        .catch((err) => console.error(err));
    }
  }, [address]);

  return (
    <>
      <Nav />
      {data.length !== 0 ? (
        <Container className="adhan">
          <h1 dir="rtl">{`اوقات الصلاة في ${ address.address.city || address.address.country} :`}</h1>
          <h3 align="center">{data.date.readable}</h3>
          <h3
            align="center"
            dir="rtl"
          >{`يوم ${data.date.hijri.weekday.ar} من شهر ${data.date.hijri.month.ar} سنة ${data.date.hijri.year} (${data.date.hijri.date})`}</h3>
          <div>
            <table cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <td>Fajr</td>
                  <td>{data.timings.Fajr}</td>
                  <td>الفجر</td>
                </tr>
                <tr>
                  <td>Sunrise</td>
                  <td>{data.timings.Sunrise}</td>
                  <td>الشروق</td>
                </tr>
                <tr>
                  <td>Dhuhr</td>
                  <td>{data.timings.Dhuhr}</td>
                  <td>الظهر</td>
                </tr>
                <tr>
                  <td>Asr</td>
                  <td>{data.timings.Asr}</td>
                  <td>العصر</td>
                </tr>
                <tr>
                  <td>Maghrib</td>
                  <td>{data.timings.Maghrib}</td>
                  <td>المغرب</td>
                </tr>
                <tr>
                  <td>Isha</td>
                  <td>{data.timings.Isha}</td>
                  <td>العشاء</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Adhan;
