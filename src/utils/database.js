const mongoose = require("mongoose");

const connect = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { name, host } = db.connection;
    console.log(`Base de datos: ${name}. Host: ${host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };
