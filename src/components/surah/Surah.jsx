import { useParams } from "react-router-dom";
import Nav from "../nav/Nav";
import "./Surah.css";
import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseIcon from "@mui/icons-material/Pause";
import Loader from "../../Loader";

function Surah() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [readerData, setReaderData] = useState([]);
  const [reader, setReader] = useState(
    localStorage.getItem("reader") !== null
      ? localStorage.getItem("reader")
      : "ar.abdulsamad"
  );

  useEffect(() => {
    fetch(`https://api.alquran.cloud/v1/surah/${id}/${reader}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
    fetch(
      `https://api.alquran.cloud/v1/edition?format=audio&language=ar&type=versebyverse`
    )
      .then((res) => res.json())
      .then((data) => setReaderData(data))
      .catch((err) => console.error(err));
  }, [id, reader]);

  useEffect(() => {
    localStorage.setItem("reader", reader);
  }, [reader]);

  function playThisPart(e) {
    //console.log(window.mediaPlaying)
    const audioElement = e.target.parentElement.querySelector("audio");
    if (audioElement) {
      const voice = audioElement;
      const allListItems =
        e.target.parentElement.parentElement.querySelectorAll("li");
      allListItems.forEach((item) => {
        const audio = item.querySelector("audio");
        audio.pause();
        item.style.color = "var(--light)";
        e.target.parentElement.style.background = "transparent";
        item.querySelectorAll("svg")[0].classList.remove("d-none");
        item.querySelectorAll("svg")[1].classList.add("d-none");
      });
      e.target.parentElement.style.color = "var(--green)";
      e.target.parentElement.style.background = "var(--lightT)";
      e.target.querySelectorAll("svg")[0].classList.add("d-none");
      e.target.querySelectorAll("svg")[1].classList.remove("d-none");
      voice.play().catch((error) => {
        console.error("Error playing audio:", error);
        e.target.parentElement.style.color = "var(--light)";
        e.target.querySelectorAll("svg")[0].classList.remove("d-none");
        e.target.querySelectorAll("svg")[1].classList.add("d-none");
      });
      voice.onended = () => {
        e.target.parentElement.style.color = "var(--light)";
        e.target.parentElement.style.background = "transparent";
        e.target.querySelectorAll("svg")[0].classList.remove("d-none");
        e.target.querySelectorAll("svg")[1].classList.add("d-none");
      };
    } else {
      console.error("Audio element not found");
    }
  }

  return (
    <>
      <Nav />
      <Container className="surahInfos">
        {data.length !== 0 ? (
          <>
            <div className="title">
              <span className="ayah" dir="rtl">
                {data.data.numberOfAyahs}آيات
              </span>
              <h3>{data.data.name}</h3>
              <span className="count">{data.data.number}</span>
            </div>
            <h4 className="basmala">
              {data.data.number !== 9
                ? "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
                : ""}
            </h4>
            <ul className="surah">
              {data.data.ayahs.map((d, i) => (
                <li key={i}>
                  <button type="button" onClick={playThisPart}>
                    <PlayCircleOutlineIcon className="" />
                    <PauseIcon
                      className="d-none"
                      style={{ color: "var(--green)" }}
                    />
                  </button>
                  <audio src={d.audio} controls className="d-none" />
                  <span>
                    {d.numberInSurah === 1 && id !== 1 && d.text.startsWith("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ") ? d.text.slice(39) : d.text}
                    <span className="ayah">{d.numberInSurah}</span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <Loader />
        )}
        <div>
          <select
            name=""
            id=""
            value={reader}
            onChange={(e) => setReader(e.target.value)}
          >
            {readerData.length !== 0
              ? readerData.data.map((d, i) => (
                  <option key={i} value={d.identifier}>
                    {d.name}
                  </option>
                ))
              : undefined}
          </select>
        </div>
      </Container>
    </>
  );
}

export default Surah;
