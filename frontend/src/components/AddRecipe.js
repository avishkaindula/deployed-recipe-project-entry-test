import { Button, FormLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// This holds the form to add recipes

const AddRecipe = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    ingredients: "",
    image: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // console.log(e.target.name, "Value", e.target.value);
  };

  const sendRequest = async () => {
    await axios
      .post("https://recipe-app-entry-test.onrender.com/recipes", {
        name: String(inputs.name),
        ingredients: String(inputs.ingredients),
        description: String(inputs.description),
        image: String(inputs.image),
      })
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        maxWidth={700}
        alignContent={"center"}
        alignSelf="center"
        marginLeft={"auto"}
        marginRight="auto"
        marginTop={10}
      >
        <FormLabel>Name</FormLabel>
        <TextField
          value={inputs.name}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="name"
        />
        <FormLabel>
          Ingredients - Please add ingredients as comma separated values - e.g :
          sugar, salt, pepper{" "}
        </FormLabel>
        <TextField
          value={inputs.ingredients}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="ingredients"
        />
        <FormLabel>Description</FormLabel>
        <TextField
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="description"
        />
        <FormLabel>Image - Please add the image as a URL</FormLabel>
        <TextField
          value={inputs.image}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="image"
        />
        <Button variant="contained" type="submit">
          Add Recipe
        </Button>
      </Box>
    </form>
  );
};

export default AddRecipe;
