import React, { useState } from "react";
import logo from "../../Assets/Icons/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../global/Auth.js";
import api from "../../Api/api.js";
import Loader from "./Loader.jsx";
import { errAlt } from "../../utilities/Alerts.js";

function Navbar() {
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const logOut = async () => {
    setLoading(true);
    await api.post("logout");
    setUser(null);
    setLoading(false);
    window.localStorage.setItem("auth", JSON.stringify(false));
    errAlt("logged out !");
    navigate("/");
  };

  const navigation = [
    { title: "Home", path: "/home" },
    { title: "Pharmacies", path: "/pharmacies" },
    { title: "Products", path: "/products" },
  ];
  return (
    <>
      <nav className="border-b w-full fixed top-0 bg-gray-50 md:text-sm md:border-none z-999 bg-opacity-5">
        <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <img src={logo} width={200} height={75} alt="pharmacy logo" />
            </Link>
            <div className="md:hidden">
              <button
                className="text-black hover:text-main-400"
                onClick={() => setState(!state)}
              >
                {state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div
            className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              state ? "block" : "hidden"
            }`}
          >
            <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => {
                return (
                  <li key={idx} className="text-gray-700 hover:text-main-400">
                    <Link to={item.path} className="block">
                      {item.title}
                    </Link>
                  </li>
                );
              })}
              <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
              <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
                {(JSON.parse(localStorage.getItem("auth")) === false ||
                  !localStorage.getItem("auth")) && (
                  <>
                    <li>
                      <Link
                        to={"/login"}
                        className="block py-3 text-center text-gray-700 hover:text-main-400 border rounded-lg md:border-none"
                      >
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/register"}
                        className="block py-3 px-4 font-medium text-center text-white bg-gray-900 hover:bg-main-400 active:bg-main-400 active:shadow-none rounded-lg shadow md:inline"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
                {JSON.parse(localStorage.getItem("auth")) && (
                  <li>
                    <button
                      onClick={logOut}
                      className="block py-3 px-4 font-medium text-center text-white bg-gray-900 hover:bg-red-600 active:bg-red-600 active:shadow-none rounded-lg shadow md:inline"
                    >
                      LogOut
                    </button>
                  </li>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
      {loading && <Loader />}
    </>
  );
}

export default Navbar;
