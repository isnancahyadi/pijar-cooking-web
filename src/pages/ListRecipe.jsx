import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardRecipe from "../components/CardRecipe";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div className="ListRecipe">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
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
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        defaultChecked
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
                          onChange={(e) => setSelectedCategory(e.target.value)}
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

          <div className="col-9">
            <section id="content">
              <div className="search mb-5">
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
                        }}
                      >
                        <button
                          type="button"
                          className="btn btn-secondary border-1"
                          onClick={() => {
                            window.scrollTo(0, 0);
                            setCurrentPage(currentPage - 1);
                          }}
                          style={{
                            width: "40px",
                            height: "40px",
                            padding: "0",
                            margin: "0 .5rem",
                          }}
                          disabled={currentPage === 1}
                        >
                          <FontAwesomeIcon icon="angle-left" />
                        </button>
                      </Link>
                      {pageNumber.map((item, key) => (
                        <Link href="" key={key}>
                          <button
                            type="button"
                            className={`btn btn-secondary border-1 ${
                              currentPage === item ? "active" : ""
                            }`}
                            onClick={() => {
                              window.scrollTo(0, 0);
                              setCurrentPage(item);
                            }}
                            style={{
                              width: "40px",
                              height: "40px",
                              padding: "0",
                              margin: "0 .5rem",
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
                            currentPage === pageNumber.length ? "none" : "auto"
                          }`,
                        }}
                      >
                        <button
                          type="button"
                          className="btn btn-secondary border-1"
                          onClick={() => {
                            window.scrollTo(0, 0);
                            setCurrentPage(currentPage + 1);
                          }}
                          style={{
                            width: "40px",
                            height: "40px",
                            padding: "0",
                            margin: "0 .5rem",
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
  );
};

export default ListRecipe;
