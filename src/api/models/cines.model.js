//se tiene que crear un modelo/plantilla/template/estructura de datos para cada una de las colecciones que tenga una BBDD.

const mongoose = require("mongoose");
//obtengo el Schema de mongoose
const Schema = mongoose.Schema;

//creo el Schema de la colección personas

const cinesSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    movies: [{ type: Schema.Types.ObjectId, ref: "movies" }],
  },
  {
    collection: "cinema",
    timestamps: true,
  }
);

//creo el modelo de la coleccion basado en el schema definido
//el modelo por buenas prácticas lo ponemos que empiece por mayúscula

const Cine = mongoose.model("cinema", cinesSchema);

//se debe exportar para poder usarlo
module.exports = Cine;
