import React from "react";
import { Link } from "react-router-dom";

const CardRecipe = ({ recipe }) => {
  return (
    <div className="CardRecipe">
      <Link
        to={`/detail/${recipe?.title?.toLowerCase()?.split(" ")?.join("-")}`}
        state={{ id: recipe?.id }}
        style={{ textDecoration: "none" }}
      >
        <div className="card">
          <img src={recipe?.image} className="card-img-top" alt="Recipe" />
          <div className="card-body">
            <h5 className="card-title">{recipe?.title}</h5>
            <p className="card-text cutoff-text">{recipe?.description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                created by {recipe?.created_by}
              </small>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardRecipe;
