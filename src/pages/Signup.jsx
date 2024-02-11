//Tools
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//image
import netflixBg from "../images/netflix.png";
//Context
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {user, signUp} = UserAuth();
  const navigate = useNavigate();

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
      event.preventDefault();
      try {
        await signUp(email, password);
        navigate("/");
      } catch(error) {
        console.log(error.message);
        setError('Sign up unsuccessfull ' + error.message);
      }
  }

  return (
    <div className="w-full h-[screen]">
      <img
        className="absolute w-full h-full object-cover hidden md:block"
        src={netflixBg}
        alt="/"
      />
      <div className="fixed top-0 left-0 w-full h-full z-[11] bg-black/60"></div>
      <div className="fixed w-full z-[20] py-24">
        <div className="max-w[500px] h-[550px] mx-auto bg-black/75 text-white">
          <div className="max-w-[350px] mx-auto py-24">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            {error ? <p className="bg-red-400 text-white">{error}</p> : null}
            <form 
                onSubmit={handleSubmit}
                className="full flex flex-col py-4">
              <input
                onChange={updateEmail}
                type="email"
                placeholder="Email"
                autoComplete="email"
                className="p-3 my-2 bg-gray-700 rounded"
              />
              <input
                onChange={updatePassword}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                className="p-3 my-2 bg-gray-700 rounded"
              />
              <button className="bg-red-600 py-3 my-6 rounded font-bold">
                Sign Up
              </button>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <p className="cursor-pointer">
                  <input className="mr-2 cursor-pointer" type="checkbox" />
                  Remember me
                </p>
                <p className="cursor-pointer">Need Help?</p>
              </div>
              <p className="py-4 cursor-pointer">
                <span className="text-gray-600">
                  Already subscribd to Netflix?
                </span>
                <Link to='/login'>Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
