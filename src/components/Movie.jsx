import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
//firebase
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
//Context
import { UserAuth } from "../context/AuthContext";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);
  const saveFavourite = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        favourites: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save your favourites");
    }
  };

  return (
    <div className="w-[165px] sm:w-[215px] md:w-[250px] lg:w-[300px] inline-block cursor-pointer relative mx-2">
      <img
        className="w-full h-[auto] block"
        src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
        alt={item.title}
      />
      <div className="text-white absolute top-0 left-0 w-full h-full opacity-0 hover:bg-black/80 hover:opacity-100">
        <p className="flex justify-center items-center h-full text-center text-xs font-bold">
          {item.title}
        </p>
        <p onClick={saveFavourite}>
          {like ? (
            <FaHeart className="absolute top-2 left-2 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-2 left-2 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movie;
