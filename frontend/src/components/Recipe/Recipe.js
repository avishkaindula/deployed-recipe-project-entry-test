import { Button } from "@mui/material";
import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Recipe.css";

// This will hold the single recipe items

const Recipe = (props) => {
  const history = useNavigate();
  const { _id, name, image } = props.recipe;
  const deleteHandler = async () => {
    let result = window.confirm("Are you sure you want to delete the recipe?");
    if (result) {
      await axios
        .delete(`https://recipe-app-entry-test.onrender.com/recipes/${_id}`)
        .then((res) => res.data)
        .then(() => history("/"))
        .then(() => window.location.reload(false));
    }
  };

  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <Button LinkComponent={Link} to={`/view/${_id}`} sx={{ mt: "auto" }}>
        View
      </Button>
      <Button LinkComponent={Link} to={`/edit/${_id}`} sx={{ mt: "auto" }}>
        Update
      </Button>
      <Button color="error" onClick={deleteHandler} sx={{ mt: "auto" }}>
        Delete
      </Button>
    </div>
  );
};

export default Recipe;
