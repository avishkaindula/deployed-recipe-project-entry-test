import React, { useEffect, useState } from "react";
import "./Recipe.css";
import axios from "axios";
import Recipe from "./Recipe";
const URL = "https://recipe-app-entry-test.onrender.com/recipes";

// This holds the recipes list

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const Recipes = () => {
  const [recipes, setRecipes] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setRecipes(data.recipes));
  }, []);

  console.log(recipes);
  return (
    <div>
      <ul>
        {recipes &&
          recipes.map((recipe, i) => (
            <li key={i}>
              <Recipe recipe={recipe} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Recipes;
