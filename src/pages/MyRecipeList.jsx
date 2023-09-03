import React, { useEffect, useState } from "react";
import ListRecipeContainer from "../components/ListRecipe/ListRecipeContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyRecipeList = () => {
  const navigate = useNavigate();

  const [recipeIsFetching, setRecipeIsFetching] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "My Recipes";
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);

  useEffect(() => {
    setRecipeIsFetching(true);
    axios
      .get(`${process.env.REACT_APP_MY_RECIPES}?limit=6&page=${currentPage}`)
      .then(({ data }) => {
        setRecipeList(data?.payload?.metadata);
        setTotalPage(data?.payload?.total_page);
        setRecipeIsFetching(false);
      })
      .catch(() => {
        setRecipeIsFetching(false);
      });
  }, [currentPage]);

  return (
    <div className="MyRecipeList">
      <ListRecipeContainer
        recipeIsFetching={recipeIsFetching}
        listRecipes={recipeList}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </div>
  );
};

export default MyRecipeList;
