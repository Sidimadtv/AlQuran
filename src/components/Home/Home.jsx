import React, { useEffect, useState } from "react";
import Nav from "../nav/Nav";
import { Container } from "@mui/material";
import "./Home.css";
import { Link } from "react-router-dom";
import Loader from "../../Loader";

function Home() {
  const change = false;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/meta")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [change]);

  return (
    <>
      <Nav />
      {data.length !== 0 ? (
        <Container className="quranList">
          {data.data.surahs.references.map((d, i) => (
            <Link to={`/surah/${d.number}`} className="card" key={i}>
              <span className="ayah" dir="rtl">
                {d.numberOfAyahs}آيات
              </span>
              <h3>{d.name.slice(7)}</h3>
              <span className="count">{d.number}</span>
            </Link>
          ))}
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Home;
