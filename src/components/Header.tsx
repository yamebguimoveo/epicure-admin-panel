import React, { useEffect, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const userState = useAppSelector((state) => state.user);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, [userState]);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className='header p-3 bg-dark text-white'>
      <div className='container'>
        <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
          <span
            onClick={() => navigate("/")}
            className='d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none'
          >
            <img
              className='header-logo'
              alt='header-logo'
              src='https://yamepicure.s3.amazonaws.com/assets/logo/about-logo%403x.png'
            />
          </span>

          <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
            <li>
              <span
                onClick={() => navigate("/restaurants")}
                className='nav-link px-2 text-white'
              >
                Restaurants
              </span>
            </li>
            <li>
              <span
                onClick={() => navigate("/")}
                className='nav-link px-2 text-white'
              >
                Dishes
              </span>
            </li>
            <li>
              <span
                onClick={() => navigate("/")}
                className='nav-link px-2 text-white'
              >
                Chefs
              </span>
            </li>
          </ul>

          <form
            className='col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3'
            role='search'
          ></form>

          {!isLoggedIn ? (
            <div className='text-end'>
              <Link to='/login'>
                <button type='button' className='btn btn-outline-light me-2'>
                  Login
                </button>
              </Link>
              <Link to='/signup'>
                <button type='button' className='btn btn-warning'>
                  Sign-up
                </button>
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              type='button'
              className='btn btn-danger'
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
