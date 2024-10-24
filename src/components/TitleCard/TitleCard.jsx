import React, { useEffect, useRef, useState } from 'react'
import './TitleCard.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'
const TitleCard = ({title,category}) => {

  const [apiData,setApiData]=useState([]);
  const cardsref =useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWEzMGIwODNhM2Y3NTYzMjQzZjZlOGY4YTExNWM0MyIsIm5iZiI6MTcyNTcwOTM4OS4yMjk3MDQsInN1YiI6IjY2ZGMzNjhiZWZiOTFhMzFhNWVjNTE4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MjZ7-AaI-JTcfligNdS3y3pJBEYemmymB68YCVFIc_s'
    }
  };
  
  

  const handelwheel=(event)=>{
    event.preventDefault();
    cardsref.current.scrollLeft += event.deltaY;
  }
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsref.current.addEventListener("wheel",handelwheel);
  },[]);


  return (
    <div className='title-card'>
      <h2>{title?title:"Populaire on Netflix"}</h2>
      <div className="card-list" ref={cardsref}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCard