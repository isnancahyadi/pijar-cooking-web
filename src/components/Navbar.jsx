import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAuth } from "../store/reducers/authSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.auth);

  const dispatch = useDispatch();

  return (
    <div className="Nav">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid mx-4">
          <Link className="navbar-brand" to={"/"}>
            <img id="logo-app" src="/assets/icon/logo-2.svg" alt="Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            id="item-navbar"
            className="row"
            style={{ justifyContent: "space-between", width: "100%" }}
          >
            <ul className="navbar-nav col-auto">
              <li className="nav-item mx-4">
                <Link className="nav-link fs-5 fw-bold" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item mx-4">
                <Link className="nav-link fs-5 fw-bold" to={"/recipe"}>
                  List Recipe
                </Link>
              </li>
              <li className="nav-item mx-4">
                <Link className="nav-link fs-5 fw-bold" to={"/recipe/add"}>
                  Add Recipe
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav col-auto">
              {localStorage.getItem("token") ? (
                <>
                  <li className="nav-item mx-1">
                    <div className="dropdown">
                      <div
                        className="row d-flex justify-content-center align-items-center"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="col-auto text fs-5 order-2 order-md-1">
                          Hi, {user?.username}
                        </div>
                        <div className="col-auto ps-0 order-1 order-md-2">
                          <img
                            className="img-profile rounded-circle"
                            src={user?.profile_picture}
                            alt="Profile"
                          />
                        </div>
                      </div>
                      <ul className="dropdown-menu dropdown-menu-end text-end">
                        <li>
                          <Link className="dropdown-item" to={"/profile"}>
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to={"/my-recipe"}>
                            My Recipe
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            onClick={() => {
                              localStorage.clear();
                              dispatch(resetAuth);
                              window.location.href = "/login";
                            }}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-1">
                    <Link to={"/login"}>
                      <button
                        id="btn-login"
                        type="button"
                        className="btn btn-primary border-2 rounded-pill mt-1 mb-1"
                      >
                        Login
                      </button>
                    </Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link to={"/register"}>
                      <button
                        id="btn-register"
                        type="button"
                        className="btn btn-secondary border-2 rounded-pill mt-1 mb-1"
                      >
                        Register
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div id="navbarText" className="collapse navbar-collapse">
            <div id="collapse-item">
              <ul className="navbar-nav col-auto">
                <li className="nav-item mx-4">
                  <Link className="nav-link fs-5 fw-bold" to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item mx-4">
                  <Link className="nav-link fs-5 fw-bold" to={"/recipe/add"}>
                    List Recipe
                  </Link>
                </li>
                <li className="nav-item mx-4">
                  <Link className="nav-link fs-5 fw-bold" to={"/recipe/add"}>
                    Add Recipe
                  </Link>
                </li>
                <li className="nav-item mx-4">
                  <hr className="my-1" />
                </li>
                {localStorage.getItem("token") ? (
                  <>
                    <li className="nav-item mx-4">
                      <Link className="nav-link fs-5 fw-bold" to={"/profile"}>
                        My Profile
                      </Link>
                    </li>
                    <li className="nav-item mx-4">
                      <Link
                        className="nav-link fs-5 fw-bold"
                        onClick={() => {
                          localStorage.clear();
                          dispatch(resetAuth);
                          window.location.href = "/login";
                        }}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item mx-4">
                      <Link to={"/login"}>
                        <button
                          id="btn-login"
                          type="button"
                          className="btn btn-primary border-2 rounded-pill mt-1 mb-1"
                        >
                          Login
                        </button>
                      </Link>
                    </li>
                    <li className="nav-item mx-1">
                      <Link to={"/register"}>
                        <button
                          id="btn-register"
                          type="button"
                          className="btn btn-secondary border-2 rounded-pill mt-1 mb-1"
                        >
                          Register
                        </button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
