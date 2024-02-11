import React, { useState, useEffect } from "react";
//Context
import { UserAuth } from "../context/AuthContext";
//firebase
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
//icons
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const Favourites = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const slideToLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideToRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  
  const updateReference = doc(db, "users", `${user?.email}`);
  const deleteShow = async (ID) => {
    try {
      const moviesLeft = movies.filter((item) => item.id !== ID);
      await updateDoc(updateReference, {
        favourites: moviesLeft,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.favourites);
    });
  }, [user?.email]);


  return (
    <>
      <h2 className="text-white md:text-xl lg:text-4xl font-bold p-4 md:p-8">
         Shows/Movie
      </h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideToLeft}
          className="bg-white absolute left-0 top-[50%] translate-y-[-50%] rounded-full opacity-50 hover:opacity-100 z-[10] cursor-pointer hidden group-hover:block"
          size={40}
        />
        <div
          className="relative w-full h-full overflow-x-scroll smooth-scroll scrollbar-hide whitespace-nowrap"
          id={"slider"}
        >
          {movies && movies.map((item, id) => (
            <div
              key={id}
              className="w-[165px] sm:w-[215px] md:w-[250px] lg:w-[300px] inline-block cursor-pointer relative mx-2"
            >
              <img
                className="w-full h-[auto] block"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item.title}
              />
              <div className="absolute top-0 left-0 w-full h-full opacity-0 hover:bg-black/80 hover:opacity-100 text-white">
                <p className="text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item.title}
                </p>
                <p
                  onClick={() => deleteShow(item.id)}
                  className="absolute text-gray top-4 right-4"
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
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

export default Favourites;
