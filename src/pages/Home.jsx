import React from "react";
import Main from "../components/Main";
import MoviesTrack from '../components/MoviesTrack';
import requests from '../Requests';
import { v4 as generateID } from 'uuid';

const Home = () => {
    const movieCategories = ['Upcoming', 'Trending', 'Popular', 'TopRated', 'Horror'];

    const generateMovieID = () => {
        return generateID();
    };

    return (
    <>
      <Main />
      <MoviesTrack trackID={generateMovieID()} title={movieCategories[0]} fetchURL={requests.upcoming} />
      <MoviesTrack trackID={generateMovieID()} title={movieCategories[1]} fetchURL={requests.trending} />
      <MoviesTrack trackID={generateMovieID()} title={movieCategories[2]} fetchURL={requests.popular} />
      <MoviesTrack trackID={generateMovieID()} title={movieCategories[3]} fetchURL={requests.topRated} />
      <MoviesTrack trackID={generateMovieID()} title={movieCategories[4]} fetchURL={requests.horror} />
    </>
  );
};

export default Home;
