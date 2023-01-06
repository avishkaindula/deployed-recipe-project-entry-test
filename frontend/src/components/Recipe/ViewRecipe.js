import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./ViewRecipe.module.css";

// This holds the details of a single recipe

const ViewRecipe = () => {
  const [inputs, setInputs] = useState();
  const id = useParams().id;
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`https://recipe-app-entry-test.onrender.com/recipes/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.recipe));
    };
    fetchHandler();
  }, [id]);

  return (
    <div>
      {inputs && (
        <div className={classes.card}>
          <div className={classes.image}>
            <img src={inputs.image} alt={inputs.name} />
          </div>
          <div className={classes.content}>
            <h3>{inputs.name}</h3>
            <p className={classes.sub}>Ingredients</p>
          </div>
          <div className={classes.list}>
            <ul>
              {inputs.ingredients.map((ingredient) => {
                return <li className={classes.singles}>{ingredient}</li>;
              })}
            </ul>
          </div>
          <div className={classes.content}>
            <p className={classes.sub}>Description</p>
            <br />
            <p>{inputs.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRecipe;
