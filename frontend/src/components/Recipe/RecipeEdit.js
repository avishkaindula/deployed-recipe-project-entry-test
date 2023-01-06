import { Box, Button, FormLabel, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// This holds the form to edit recipes

const RecipeEdit = () => {
  const [inputs, setInputs] = useState();
  const id = useParams().id;
  const history = useNavigate();
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`https://recipe-app-entry-test.onrender.com/recipes/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.recipe));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`https://recipe-app-entry-test.onrender.com/recipes/${id}`, {
        name: String(inputs.name),
        ingredients: String(inputs.ingredients),
        description: String(inputs.description),
        image: String(inputs.image),
      })
      .then((res) => res.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/"));
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div>
      {inputs && (
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
              Ingredients - Please add ingredients as comma separated values -
              e.g : sugar, salt, pepper{" "}
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
              Update Recipe
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default RecipeEdit;
