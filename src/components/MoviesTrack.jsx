import { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MoviesTrack = ({ trackID, title, fetchURL }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => setMovies(response.data.results));
  }, [fetchURL]);

  const slideToLeft = () => {
    const slider = document.getElementById(trackID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideToRight = () => {
    const slider = document.getElementById(trackID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  
  return (
    <>
      <h2 className="text-white md:text-xl font-bold p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideToLeft}
          className="bg-white absolute left-0 top-[50%] translate-y-[-50%] rounded-full opacity-50 hover:opacity-100 z-[10] cursor-pointer hidden group-hover:block"
          size={40}
        />
        <div className="relative w-full h-full overflow-x-scroll smooth-scroll scrollbar-hide whitespace-nowrap"
             id={trackID}
        >
          {movies.map((item, id) => (
            <Movie item={item} key={id} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideToRight}
          className="bg-white absolute right-0 top-[50%] translate-y-[-50%] rounded-full opacity-50 hover:opacity-100 z-[10] cursor-pointer  hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default MoviesTrack;
