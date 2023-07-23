import React from "react";
import { Link } from "react-router-dom";

const CarouselItem = (props) => {
  const { title, image, id, k } = props;

  return (
    <div className="CarouselItem" key={k}>
      <div className={`carousel-item ${k === 0 ? "active" : ""}`}>
        <Link
          to={`/detail/${title?.toLowerCase()?.split(" ")?.join("-")}?${id}`}
          style={{ textDecoration: "none" }}
        >
          <img src={image} className="d-block w-100 menu-recipe" />
          <div className="carousel-caption d-block">
            <h2
              className="h2-home"
              style={{ textShadow: "2px 2px 4px #000000" }}
            >
              {title}
            </h2>
            <p className="fs-5" style={{ textShadow: "2px 2px 4px #000000" }}>
              For those of you who want to enjoy protein and nutritious dishes
              with a spicy sensation
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CarouselItem;
