import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute w-full flex justify-between items-center p-4 md:p-8 z-[100]">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold">NETFLIX</h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="text-white text-lg pr-4">Account</button>
          </Link>
          <button onClick={handleLogOut} className="text-white text-lg bg-red-600 px-6 py-2 rounded">
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white text-lg">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 text-white text-lg rounded px-4 py-2 ml-4">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
