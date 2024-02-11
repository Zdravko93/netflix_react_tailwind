//image
import netflixBg from "../images/netflix.png";
// component
import Favourites from "../components/Favourites";

const Account = () => {
  return (
    <>
      <div className="w-full text-white">
        <img
          className="w-full h-[450px] object-cover"
          src={netflixBg}
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full  h-[450px]"></div>
        <div className="absolute top-[25%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">My Favourites</h1>
        </div>
      </div>
      <Favourites />
    </>
  );
};

export default Account;
