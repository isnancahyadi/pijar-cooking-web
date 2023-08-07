import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import Carousel from "../components/Carousel";
import CardRecipe from "../components/CardRecipe";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [search, setSearch] = useState("");
  const [foundRecipes, setFoundRecipes] = useState([]);

  useEffect(() => {
    document.title = "Home";
  }, []);

  useEffect(() => {
    axios.get(process.env.REACT_APP_NEW_RECIPES).then((response) => {
      setRecipeList(response?.data?.payload?.metadata[0]);
    });
  }, []);

  const fetchDataRecipe = async () => {
    setIsLoading(true);
    await axios
      .get(`${process.env.REACT_APP_RECIPE}?search=${search}`)
      .then(({ data }) => {
        setFoundRecipes(data?.payload?.metadata);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        if (response?.status === 404) {
          setFoundRecipes([]);
          setIsLoading(false);
        }
      });
  };

  return (
    <>
      <div className="Home">
        <div className="container-fluid">
          {/* <!-- Start of home section --> */}
          <section id="home-section" className="main-content">
            <div className="row align-items-center">
              <div className="main-title col-md-6 col-xs-12 order-2 order-md-1 text-md-start text-center">
                <h1 className="h1-home text-primary-emphasis">
                  Discover Recipe <br />& Delicious Food
                </h1>
                <div className="search mb-3 mt-3">
                  <FontAwesomeIcon
                    className="ic"
                    icon="magnifying-glass"
                    size="lg"
                  />
                  <input
                    className="form-control form-control-lg"
                    placeholder="Search Restaurant, Food"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        fetchDataRecipe();
                        document.querySelector("#modal").click();
                      }
                    }}
                  />
                  <div
                    id="modal"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  />
                  <div
                    className="modal fade"
                    id="exampleModal"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Search for {search}
                          </h1>
                          <button
                            id="close-modal"
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="row row-gap-4 align-items-center justify-content-center">
                            {isLoading ? (
                              <div className="d-flex justify-content-center align-items-center">
                                <div
                                  className="spinner-grow"
                                  style={{
                                    width: "3rem",
                                    height: "3rem",
                                    color: "rgb(215, 154, 255)",
                                  }}
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              </div>
                            ) : !foundRecipes.length ? (
                              <div className="text-center">
                                <h5 className="text-body-tertiary">
                                  Recipe not found
                                </h5>
                              </div>
                            ) : (
                              foundRecipes.map((item, key) => (
                                <div
                                  key={key}
                                  className="col-4 col-xs-6"
                                  onClick={() =>
                                    document
                                      .querySelector("#close-modal")
                                      .click()
                                  }
                                >
                                  <CardRecipe recipe={item} />
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-img col-md-6 order-1 order-md-2 animate__animated animate__fadeInRight">
                <img
                  className="menu-recipe"
                  src="/assets/img/recipe/chicken-green-curry-bowl.jpg"
                  alt="Recipe"
                />
              </div>
            </div>
            <div className="bg-purple-decoration animate__animated animate__fadeInRight"></div>
          </section>
          {/* <!-- End of home section --> */}

          {/* <!-- Start of recomended recipe section --> */}
          <section id="recomended-section" className="main-content">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="bg-purple-decoration-2"></div>
              </div>
              <div className="col-auto">
                <h2 className="h2-home text-primary-emphasis animate__animated animate__fadeInLeft">
                  Popular For You !
                </h2>
              </div>
            </div>
            <div className="row align-items-center mt-5">
              <div className="col-md-6 text-md-start text-center">
                <img
                  className="menu-recipe"
                  src="/assets/img/recipe/chinese-shrimp-fried-rice-with-chili-fish-sauce.jpg"
                  alt="Recipe"
                />
                <div className="bg-purple-decoration-3"></div>
              </div>
              <div className="recomended-title col-md-6 text-md-start text-center">
                <h1 className="h1-home text-primary-emphasis animate__animated animate__fadeIn">
                  American Shrimp <br />
                  Fried Rice
                </h1>
                <hr
                  className="hr-home solid"
                  style={{ borderTop: "2px solid" }}
                />
                <p className="text-muted fs-5 animate__animated animate__fadeIn">
                  Want to try a simple menu with a western style and a little
                  taste of the sea? Here's the answer
                </p>
                <form action="#">
                  <button
                    id="btn"
                    className="btn btn-primary mt-3 animate__animated animate__fadeIn"
                  >
                    Learn More
                  </button>
                </form>
              </div>
            </div>
          </section>
          {/* <!-- End of recomended recipe section --> */}

          {/* <!-- Start of new recipe section --> */}
          <section id="new-recipe-section" className="main-content">
            <div className="row align-items-center">
              <div className="new-recipe-title col-md-6 order-2 order-md-1 text-md-start text-center animate__animated animate__fadeInLeft">
                <div className="row text-new-recipe">
                  <div className="col-auto">
                    <div className="bg-purple-decoration-5"></div>
                  </div>
                  <div className="col-auto">
                    <h2 className="h2-home text-primary-emphasis">
                      New Recipe
                    </h2>
                  </div>
                  <div className="col-auto">
                    <div className="bg-purple-decoration-5"></div>
                  </div>
                </div>
                <h1 className="h1-home text-primary-emphasis">
                  {recipeList?.title}
                </h1>
                <hr
                  className="hr-home solid"
                  style={{ borderTop: "2px solid" }}
                />
                <p className="text-muted fs-5">
                  Already come! New recipes with Asian flavors that are suitable
                  for everyone. Want to try it?
                </p>
                <Link
                  to={`/detail/${recipeList?.title
                    ?.toLowerCase()
                    ?.split(" ")
                    ?.join("-")}`}
                  state={{ id: recipeList?.id }}
                  style={{ textDecoration: "none" }}
                >
                  <button id="btn" className="btn btn-primary mt-3">
                    Learn More
                  </button>
                </Link>
              </div>
              <div className="col-md-6 order-1 order-md-2 text-md-start text-center">
                <div className="new-recipe-img">
                  <img className="menu-recipe" src={recipeList?.image} />
                </div>
                <div className="bg-purple-decoration-4"></div>
              </div>
            </div>
          </section>
          {/* <!-- End of new recipe section --> */}

          {/* <!-- Start of popular recipe section --> */}
          <section id="popular-recipe-section" className="main-content">
            <div className="row align-items-center justify-content-center mb-5 animate__animated animate__zoomIn">
              <div className="col-auto">
                <FontAwesomeIcon
                  className="ic-star"
                  icon="star"
                  size="lg"
                  style={{ color: "rgb(215, 154, 255)" }}
                />
                <FontAwesomeIcon
                  className="ic-star"
                  icon="star"
                  size="xl"
                  style={{ color: "rgb(215, 154, 255)" }}
                />
                <FontAwesomeIcon
                  className="ic-star"
                  icon="star"
                  size="2xl"
                  style={{ color: "rgb(215, 154, 255)" }}
                />
              </div>
              <div className="col-auto">
                <h2 className="h2-home text-primary-emphasis">
                  Popular Recipe
                </h2>
              </div>
              <div className="col-auto">
                <FontAwesomeIcon
                  className="ic-star"
                  icon="star"
                  size="2xl"
                  style={{ color: "rgb(215, 154, 255)" }}
                />
                <FontAwesomeIcon
                  className="ic-star"
                  icon="star"
                  size="xl"
                  style={{ color: "rgb(215, 154, 255)" }}
                />
                <FontAwesomeIcon
                  className="ic-star"
                  icon="star"
                  size="lg"
                  style={{ color: "rgb(215, 154, 255)" }}
                />
              </div>
            </div>
            <Carousel />
          </section>
          {/* <!-- End of popular recipe section --> */}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
