import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardRecipe from "../components/CardRecipe";
import axios from "axios";
import { Link } from "react-router-dom";
import Drawer from "../components/ListRecipe/Drawer";

const ListRecipe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listRecipes, setListRecipes] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "List Recipes";
  }, []);

  const fetchDataRecipe = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_RECIPE}?limit=12&page=${currentPage}&search=${query}`
      )
      .then(({ data }) => {
        setListRecipes(data?.payload?.metadata);
        setTotalPage(data?.payload?.total_page);
        setIsLoading(false);
      });
  };

  const fetchDataCategory = async () => {
    await axios.get(process.env.REACT_APP_GET_CATEGORY).then(({ data }) => {
      setListCategory(data?.payload);
      setIsLoading(false);
    });
  };

  const fetchDataRecipeByCategory = async () => {
    if (selectedCategory === "") {
      fetchDataRecipe();
    } else {
      await axios
        .get(
          `${process.env.REACT_APP_GET_CATEGORY}/${selectedCategory}?page=${currentPage}`
        )
        .then(({ data }) => {
          setListRecipes(data?.payload?.metadata);
          setTotalPage(data?.payload?.total_page);
          setIsLoading(false);
        })
        .catch(({ response }) => {
          if (response?.status === 404) {
            setListRecipes([]);
            setIsLoading(false);
          }
        });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchDataRecipe();
  }, [query, currentPage]);

  useEffect(() => {
    setIsLoading(true);
    fetchDataCategory();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchDataRecipeByCategory();
  }, [selectedCategory]);

  const pageNumber = [];
  for (let index = 1; index <= totalPage; index++) {
    pageNumber.push(index);
  }

  return (
    <>
      <div className="ListRecipe">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-0">
              <section id="sidebar">
                <h3 className="sidebar-title">Category</h3>
                <div className="mt-3 w-100">
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
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <label className="radio m-2">
                        <input
                          id="category-slug"
                          type="radio"
                          name="category"
                          value=""
                          checked={selectedCategory === ""}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          // defaultChecked
                        />
                        <div
                          id="category-name"
                          className="d-flex align-items-center justify-content-center"
                        >
                          <span>All</span>
                        </div>
                      </label>
                      {listCategory.map((item, key) => (
                        <label key={key} className="radio m-2">
                          <input
                            id="category-slug"
                            type="radio"
                            name="category"
                            value={item?.slug}
                            checked={selectedCategory === item?.slug}
                            onChange={(e) =>
                              setSelectedCategory(e.target.value)
                            }
                          />
                          <div
                            id="category-name"
                            className="d-flex align-items-center justify-content-center"
                          >
                            <span>{item?.name}</span>
                          </div>
                        </label>
                      ))}
                    </>
                  )}
                </div>
              </section>
            </div>

            <div className="col-md-9 col-12">
              <section id="content">
                <div className="row mb-5 align-items-center justify-content-center">
                  <div className="col-md-0 col-auto">
                    <button
                      id="btn-category-drawer"
                      className="btn btn-primary"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasNavbar"
                      aria-controls="offcanvasNavbar"
                      aria-label="Toggle navigation"
                    >
                      <FontAwesomeIcon icon="sliders" size="xl" />
                    </button>
                    <Drawer
                      isLoading={isLoading}
                      selectCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      listCategory={listCategory}
                    />
                  </div>
                  <div className="col-md-12 col">
                    <div className="search">
                      <FontAwesomeIcon
                        className="ic"
                        icon="magnifying-glass"
                        size="lg"
                      />
                      <input
                        className="form-control form-control-lg"
                        placeholder="Search Restaurant, Food"
                        onChange={(e) => setQuery(e.target.value.toLowerCase())}
                      />
                    </div>
                  </div>
                </div>
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
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : !listRecipes.length ? (
                  <div className="text-center">
                    <h5 className="text-body-tertiary">Recipe not found</h5>
                  </div>
                ) : (
                  <>
                    <div className="row row-gap-4">
                      {listRecipes.map((item, key) => (
                        <div key={key} className="col-4 col-xs-6">
                          <CardRecipe recipe={item} />
                        </div>
                      ))}
                    </div>
                    <div className="pagination mt-5">
                      <div className="container d-flex justify-content-center align-items-center">
                        <Link
                          href=""
                          style={{
                            pointerEvents: `${
                              currentPage === 1 ? "none" : "auto"
                            }`,
                            textDecoration: "none",
                          }}
                        >
                          <button
                            type="button"
                            className="btn btn-secondary btn-pagination border-1"
                            onClick={() => {
                              window.scrollTo(0, 0);
                              setCurrentPage(currentPage - 1);
                            }}
                            disabled={currentPage === 1}
                          >
                            <FontAwesomeIcon icon="angle-left" />
                          </button>
                        </Link>
                        {pageNumber.map((item, key) => (
                          <Link
                            href=""
                            key={key}
                            style={{ textDecoration: "none" }}
                          >
                            <button
                              type="button"
                              className={`btn btn-secondary btn-pagination border-1 ${
                                currentPage === item ? "active" : ""
                              }`}
                              onClick={() => {
                                window.scrollTo(0, 0);
                                setCurrentPage(item);
                              }}
                            >
                              <h6 className="m-0 p-0">{item}</h6>
                            </button>
                          </Link>
                        ))}
                        <Link
                          href=""
                          style={{
                            pointerEvents: `${
                              currentPage === pageNumber.length
                                ? "none"
                                : "auto"
                            }`,
                            textDecoration: "none",
                          }}
                        >
                          <button
                            type="button"
                            className="btn btn-secondary btn-pagination border-1"
                            onClick={() => {
                              window.scrollTo(0, 0);
                              setCurrentPage(currentPage + 1);
                            }}
                            disabled={currentPage === pageNumber.length}
                          >
                            <FontAwesomeIcon icon="angle-right" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListRecipe;
