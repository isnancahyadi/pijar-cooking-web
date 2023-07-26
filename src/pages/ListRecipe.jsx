import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardRecipe from "../components/CardRecipe";
import axios from "axios";

const ListRecipe = () => {
  const [listRecipes, setListRecipes] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    document.title = "List Recipes";
  }, []);

  const fetchDataRecipe = async () => {
    await axios
      .get(`${process.env.REACT_APP_RECIPE}?limit=12&search=${query}`)
      .then(({ data }) => {
        setListRecipes(data?.payload?.metadata);
      });
  };

  const fetchDataCategory = async () => {
    await axios.get(process.env.REACT_APP_GET_CATEGORY).then(({ data }) => {
      setListCategory(data?.payload);
    });
  };

  const fetchDataRecipeByCategory = async () => {
    if (selectedCategory === "") {
      fetchDataRecipe();
    } else {
      await axios
        .get(`${process.env.REACT_APP_GET_CATEGORY}/${selectedCategory}`)
        .then(({ data }) => {
          setListRecipes(data?.payload);
        });
    }
  };

  useEffect(() => {
    fetchDataRecipe();
  }, [query]);

  useEffect(() => {
    fetchDataCategory();
  }, []);

  useEffect(() => {
    fetchDataRecipeByCategory();
  }, [selectedCategory]);

  return (
    <div className="ListRecipe">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <section id="sidebar">
              <h3 className="sidebar-title">Category</h3>
              <div>
                <div className="form-check">
                  <input
                    id="category-default"
                    className="form-check-input"
                    type="radio"
                    value=""
                    name="category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    defaultChecked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="category-default"
                  >
                    All
                  </label>
                </div>
                {listCategory.map((item, key) => (
                  <div key={key} className="form-check">
                    <input
                      id="category-slug"
                      className="form-check-input"
                      type="radio"
                      value={item?.slug}
                      name="category"
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="category-slug">
                      {item?.name}
                    </label>
                  </div>
                ))}
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
              <div className="row row-gap-4">
                {listRecipes.map((item, key) => (
                  <div key={key} className="col-4 col-xs-6">
                    <CardRecipe recipe={item} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListRecipe;
