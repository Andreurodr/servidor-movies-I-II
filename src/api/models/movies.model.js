//se tiene que crear un modelo/plantilla/template/estructura de datos para cada una de las colecciones que tenga una BBDD.

const mongoose = require("mongoose");
//obtengo el Schema de mongoose
const Schema = mongoose.Schema;

//creo el Schema de la colección personas

const moviesSchema = new Schema(
  {
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
  },
  {
    collection: "movies",
    timestamps: true,
  }
);

//creo el modelo de la coleccion basado en el schema definido
//el modelo por buenas prácticas lo ponemos que empiece por mayúscula

const Movie = mongoose.model("movies", moviesSchema);

//se debe exportar para poder usarlo
module.exports = Movie;
