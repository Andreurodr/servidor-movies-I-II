const express = require("express");

const routerCines = express.Router();

const {
  getAllCinemas,
  setNewCinema,
  updateCinema,
  deleteCine,
} = require("../controllers/cines.controller");

//muestra todos los cines
routerCines.get("/", getAllCinemas);

//añade nuevo cine
routerCines.post("/", setNewCinema);

//modifica cine ya existente
routerCines.put("/:id", updateCinema);

//elimina un cine
routerCines.delete("/:id", deleteCine);

module.exports = routerCines;
