//requerimos express para lanzar el servidor más adelante
const express = require("express");

//requerimos cors para evitar errores de accesibilidad en las rutas
const cors = require("cors");

//requerimos dotenv e indicamos la ruta para poder almacenar las variables de entorno
require("dotenv").config({ path: "./.env" });

//nos conectamos a la BBDD
const { connect } = require("./src/utils/database");

//requerimos las rutas principales
const routerMovies = require("./src/api/routes/movies.routes");
const routerCines = require("./src/api/routes/cines.routes");

//indicamos el puerto almacenado como variable de entorno
const PORT = process.env.PORT;

//Iniciamos el servidor con express
const app = express();

//Conectamos con la BBDD
connect();

app.use(cors()); //indicamos que el servidor va a usar cors y que sea accesible desde cualquier ruta

app.use(express.json()); //para que funcionen los body params que llegan en formato tipo JSON

//configuramos para nuestra app las rutas indicadas
app.use("/movies", routerMovies);
app.use("/cinemas", routerCines);

//hacemos que la app escuche las conexiones en el puerto indicado
app.listen(PORT, () => {
  console.log(`Conectado al servidor mediante: http://localhost:${PORT}`);
});
