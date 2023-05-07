//requiero el modelo para conectarme a la BBDD
const Cine = require("../models/cines.model");

//funcion para buscar en la BBDD todas las movies
const getAllCinemas = async (req, res) => {
  try {
    const allCinemas = await Cine.find().populate({
        path: "movies",
        select: "_id title year genre"
    });; //busca todas las movies en la BBDD con una petición a mongoDB y nos muestra las relaciones que tenga mediante el populate
    return res.status(200).json(allCinemas)
  } catch (error) {
    return res.status(500).json(error);
  }
};

const setNewCinema = async (req, res) => {
  try {
    const newCinema = new Cine(req.body);
    const createdCinema = await newCinema.save(); //funcion que guarda el elemento creado en la BBDD
    return res.status(200).json(createdCinema);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateCinema = async (req, res) => {
  try {
    const { id } = req.params;
    const putCine = new Cine(req.body);
    putCine._id = id;
    const update = await Cine.findByIdAndUpdate(id, putCine, { new: true });
    //funcion de mongoose que busca por id y actualiza
    //new:true hace que retorne el nuevo documento y quede guardado en la variable update, el antiguo se borra
    return res.status(200).json(update);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteCine = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cine.findByIdAndDelete(id); //funcion de mongoose que busca por id y elimina
    //hay que controlar que el elemento a eliminar existe, si no existe devuelvo un mensaje y status 404
    if (!deleted) {
      return res.status(404).json({ message: "Cinema not found" });
    }
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getAllCinemas, setNewCinema, updateCinema, deleteCine };
