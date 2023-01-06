const Recipe = require("../model/Recipe");

const getAllRecipes = async (req, res, next) => {
  let recipes;
  try {
    recipes = await Recipe.find();
  } catch (err) {
    console.log(err);
  }

  if (!recipes) {
    return res.status(404).json({ message: "No recipes found" });
  }
  return res.status(200).json({ recipes });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let recipe;
  try {
    recipe = await Recipe.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!recipe) {
    return res.status(404).json({ message: "No Recipe found" });
  }
  return res.status(200).json({ recipe });
};

const addRecipe = async (req, res, next) => {
  let recipe;
  try {
    let ingredients = req.body.ingredients
      .split(",")
      .map((skill) => skill.trim());
    // This will extract the comma separated ingredients and add them as values of an array.

    recipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      ingredients: ingredients,
    });
    await recipe.save();
  } catch (err) {
    console.log(err);
  }

  if (!recipe) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).json({ recipe });
};

const updateRecipe = async (req, res, next) => {
  const id = req.params.id;
  let recipe;
  let ingredients;
  try {
    if (req.body.ingredients) {
      ingredients = req.body.ingredients
        .split(",")
        .map((skill) => skill.trim());
    }
    // .split() will throw an error if we don't add ingredients: on the json put request.
    // to prevent that, we need to create an if block and check whether the request body has ingredients or not.

    recipe = await Recipe.findByIdAndUpdate(id, {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      ingredients: ingredients,
    });

    recipe = await recipe.save();
  } catch (err) {
    console.log(err);
  }

  if (!recipe) {
    return res.status(404).json({ message: "Unable To Update by This ID" });
  }
  return res.status(200).json({ recipe });
};

const deleteRecipe = async (req, res, next) => {
  const id = req.params.id;
  let recipe;
  try {
    recipe = await Recipe.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!recipe) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Recipe Successfully Deleted" });
};

exports.getAllRecipes = getAllRecipes;
exports.addRecipe = addRecipe;
exports.getById = getById;
exports.updateRecipe = updateRecipe;
exports.deleteRecipe = deleteRecipe;
