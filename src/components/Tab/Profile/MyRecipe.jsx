import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyRecipe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recipeList, setRecipeList] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    axios.get(process.env.REACT_APP_MY_RECIPES).then((response) => {
      setRecipeList(response?.data?.payload?.metadata);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="MyRecipe">
      <div className="row">
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
        ) : !recipeList.length ? (
          <div className="text-center">
            <h5 className="text-body-tertiary">My recipe not found</h5>
          </div>
        ) : (
          recipeList?.map((item, key) => (
            <div
              key={key}
              className="col-md-4 col-xs-12 animate__animated animate__tada"
            >
              <Link
                to={`/detail/${item?.title
                  ?.toLowerCase()
                  ?.split(" ")
                  ?.join("-")}`}
                state={{ id: item?.id }}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="my-recipe mt-2 mb-2"
                  style={{
                    backgroundImage: `url('${item?.image}')`,
                  }}
                >
                  <h3
                    className="text-white"
                    style={{ textShadow: "2px 2px 4px #000000" }}
                  >
                    {item?.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyRecipe;
