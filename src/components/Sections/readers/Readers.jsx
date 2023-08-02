import React, { useEffect, useState } from "react";
import "./Readers.css";
import Nav from "../../nav/Nav";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../../../Loader";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Readers() {
  const [readerData, setReaderData] = useState([])

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/islamic-network/cdn/master/info/cdn_surah_audio.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setReaderData(data)
        if (localStorage.getItem("fav") !== null) {
          let favArray = JSON.parse(localStorage.getItem("fav"));
          setReaderData((prevData) =>
            prevData.map((d) => ({
              ...d,
              favorited: favArray.includes(d.identifier),
            }))
          );
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleFavorite = (index) => {
    setReaderData((prevData) => {
      const updatedData = [...prevData];
      const readerItem = updatedData[index];
      readerItem.favorited = !readerItem.favorited;
      const favItems = JSON.parse(localStorage.getItem("fav")) || [];
      if (readerItem.favorited) {
        favItems.push(readerItem.identifier);
      } else {
        const itemIndex = favItems.indexOf(readerItem.identifier);
        if (itemIndex !== -1) {
          favItems.splice(itemIndex, 1);
        }
      }
      localStorage.setItem("fav", JSON.stringify(favItems));
      return updatedData;
    });
  };
  
  

  return (
    <>
      <Nav />
      {readerData.length !== 0 ? (
        <Container className="readersList">
          {readerData.map((d, i) => (
            <div to={`/readers/${d.identifier.slice(3)}`} className="readerName" key={i}>
              <Link to={`/readers/${d.identifier.slice(3)}`}>{d.name}</Link>
              <button
                type="button"
                onClick={() => toggleFavorite(i)}
                data-id={d.identifier}
                className={`${d.favorited ? "active" : ""}`}
              >
                {d.favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </button>
            </div>
          ))}
        </Container>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Readers;
