import React, {useState, useEffect} from "react";
import instance from "../utils/axios";
import requests from "../utils/requests";
import '../styles/Banner.css';


const baseUrl = 'https://image.tmdb.org/t/p/w500'

function truncate(str, n) {
    return str?.length > n? str.substr(0, n-1) +' ...': str;
}

export default function Banner(){
    const [movie, setMovie] = useState([])
    useEffect(()=>{
        async function fetchData(){
            const request = await instance.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                ]
            )
        }
        fetchData()
    },[])


    return movie.name? (
        <header className="banner"
        style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${baseUrl}${movie?.backdrop_path})`,
            backgroundPosition: 'center',
            objectFit: "cover"
        }}
        >
            <div className="banner__contents">
                <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
            </div>
            {console.log(movie)}
            <div className='banner--fadeBottom'></div>
        </header>
    ):<div></div>
}