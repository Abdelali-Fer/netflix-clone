import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
/*
navigate('/login', { replace: true });//Cela permet de naviguer vers la page de connexion sans garder la page actuelle dans l'historique
*/
const Player = () => {


  const {id}=useParams();
  const navigate=useNavigate();

  const [apiData,setApiData]=useState({
    name:"",
    key:"",
    published_at:"",
    type:""
  })



  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWEzMGIwODNhM2Y3NTYzMjQzZjZlOGY4YTExNWM0MyIsIm5iZiI6MTcyNTk5NjY0MC42NjI3NTksInN1YiI6IjY2ZGMzNjhiZWZiOTFhMzFhNWVjNTE4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rm6jeohcSCoRxGSfWEMxs5So9_-CiYhdZeoTVQijNy8'
    }
  };
  
  
  
  
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  },[])

  


  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate('/')}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player