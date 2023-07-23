import React, { useEffect, useState } from "react";
import CarouselIndicators from "./CarouselIndicators";
import CarouselItem from "./CarouselItem";
import axios from "axios";

const Carousel = () => {
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_GET_RECIPE}?limit=5`)
      .then((response) => setRecipeList(response?.data?.payload));
  }, []);

  return (
    <>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide animate__animated animate__zoomIn"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {recipeList.map((item, key) => (
            <CarouselIndicators key={key} k={key} />
          ))}
        </div>

        <div className="carousel-inner">
          {recipeList.map((item, key) => (
            <CarouselItem
              key={key}
              title={item?.title}
              image={item?.image}
              id={item?.id}
              k={key}
            />
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousel;
