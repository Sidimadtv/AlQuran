import React, { useEffect, useState } from 'react'
import "./Reader.css"
import { useParams } from 'react-router-dom'
import Nav from "../../../nav/Nav"
import Loader from "../../../../Loader"
import { Container } from '@mui/material';
import AudioPlayer from "react-audio-player";
import TheWarning from "../../../../TheWarning"

function Reader() {
  const {reader} = useParams()
  const [namesData, setNamesData] = useState([])
  const [showWarning, setShowWarning] = useState(true)

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/meta")
      .then(res => res.json())
      .then(data => setNamesData(data))
      .catch(err => console.error(err))
  }, [])

  setTimeout(() => {
    setShowWarning(false)
  }, 10000);

  return (
    <>
      <Nav/>
      {showWarning ? <TheWarning /> : undefined}
      {
        namesData.length !== 0 ? (
          <Container className='playList'>
            {namesData.data.surahs.references.map((d, i) => (
              <div key={i}>
                <AudioPlayer src={`https://cdn.islamic.network/quran/audio-surah/128/ar.${reader}/${d.number}.mp3`} controls/>
                <span>{d.name}</span>
              </div>
            ))}
          </Container>
        ) : <Loader/>
      }
    </>
  )
}

export default Reader
