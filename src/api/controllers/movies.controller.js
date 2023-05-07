//requiero el modelo para conectarme a la BBDD
const Movie = require("../models/movies.model");

//funcion para buscar en la BBDD todas las movies
const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find(); //busca todas las movies en la BBDD con una petición a mongoDB
    return res.status(200).json(allMovies);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//funcion para buscar movie por ID
const getMoviesById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//funcion que busca movie por título y devuelve el año de la película (funciona poniéndo los títulos con las mayúsculas y acentos correspondientes y espacios con %20)
const getMoviesByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const movie = await Movie.find({ title: title });
    return res.status(200).json(movie[0].year);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//funcion que busca movie por género y la devuelve (funciona poniéndo los géneros con las mayúsculas y acentos correspondientes y espacios con %20)
const getMoviesByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const movie = await Movie.find({ genre: genre });
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getMoviesByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const movie = await Movie.find({ year: { $gt: year } });
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const setNewMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const createdMovie = await newMovie.save(); //funcion que guarda el elemento creado en la BBDD
    return res.status(200).json(createdMovie);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const putMovie = new Movie(req.body);
    putMovie._id = id;
    const update = await Movie.findByIdAndUpdate(id, putMovie, { new: true });
    //funcion de mongoose que busca por id y actualiza
    //new:true hace que retorne el nuevo documento y quede guardado en la variable update, el antiguo se borra
    return res.status(200).json(update);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Movie.findByIdAndDelete(id); //funcion de mongoose que busca por id y elimina
    //hay que controlar que el elemento a eliminar existe, si no existe devuelvo un mensaje y status 404
    if (!deleted) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllMovies,
  getMoviesById,
  getMoviesByTitle,
  getMoviesByGenre,
  getMoviesByYear,
  setNewMovie,
  updateMovie,
  deleteMovie,
};
