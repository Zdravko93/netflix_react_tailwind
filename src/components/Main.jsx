import React, { useState, useEffect } from "react";
import axios from "axios";
import requests from "../Requests";

const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.popular).then(
      response => setMovies(response.data.results)
    ).catch(error => {
      console.error('Failed to fetch data: ' +  error.message)
    })
  }, []);
  
  return (
    <>
      <div className="w-full h-[550px] text-white">
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
          <img
            className="w-full h-full object-fit"
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt="netflix-hero"
          />
          <div className="absolute w-full top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
            <div className="my-4">
              <button className="border border-gray-300 bg-gray-300 text-black py-2 px-4">
                Play
              </button>
              <button className="border border-gray-300 py-2 px-4 ml-4">
                Watch Later
              </button>
            </div>
            <p className="text-gray-400 text-sm">Released: {movie?.release_date}</p>
            <p className="w-full md:max-w[75%] lg:max-w-[50%] xl:max-w-[35%]">
              {movie?.overview}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

