const mongoose = require("mongoose");

//aquí creo la funcion para conectarme a la base de datos

const Movie = require("../api/models/movies.model.js");

//Declaramos el array
const arrayMovies = [
  {
    title: "The Matrix",
    director: "Hermanas Wachowski",
    year: 1999,
    genre: "Acción",
  },
  {
    title: "The Matrix Reloaded",
    director: "Hermanas Wachowski",
    year: 2003,
    genre: "Acción",
  },
  {
    title: "Buscando a Nemo",
    director: "Andrew Stanton",
    year: 2003,
    genre: "Animación",
  },
  {
    title: "Buscando a Dory",
    director: "Andrew Stanton",
    year: 2016,
    genre: "Animación",
  },
  {
    title: "Interestelar",
    director: "Christopher Nolan",
    year: 2014,
    genre: "Ciencia ficción",
  },
  {
    title: "50 primeras citas",
    director: "Peter Segal",
    year: 2004,
    genre: "Comedia romántica",
  },
];

//nos conectamos a mongoose, borramos lo que exista previamente, lanzamos la semilla y nos desconectamos
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allMovies = await Movie.find();
    if (allMovies.length > 0) {
      await Movie.collection.drop();
      console.log("Películas borradas");
    }
  })
  .catch((error) => console.log(`Error borrando películas: ${error}`))
  .then(async () => {
    const moviesMap = arrayMovies.map((movie) => new Movie(movie));
    await Movie.insertMany(moviesMap);
    console.log("Se han insertado las películas");
  })
  .catch((error) => console.log(`Error insertando películas: ${error}`))
  .finally(() => mongoose.disconnect());
