const express = require("express");

const routerMovies = express.Router();

const {
  getAllMovies,
  getMoviesById,
  getMoviesByTitle,
  getMoviesByGenre,
  getMoviesByYear,
  setNewMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies.controller");

//muestra todas las movies
routerMovies.get("/", getAllMovies);

//muestra las movies por id
routerMovies.get("/:id", getMoviesById);

//muestra las movies por titulo
routerMovies.get("/title/:title", getMoviesByTitle);

//muestra las movies por genero
routerMovies.get("/genre/:genre", getMoviesByGenre);

//muestra las movies a partir del año 2010(hay que indicar el año 2010 en el req.params y muestra a partir de ese año)
routerMovies.get("/year/:year", getMoviesByYear);

//añade nueva movie
routerMovies.post("/post", setNewMovie);

//modifica una movie
routerMovies.put("/:id", updateMovie);

//elimina una movie
routerMovies.delete("/:id", deleteMovie);

module.exports = routerMovies;
