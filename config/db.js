import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "variables.env" });

//Conectar a la base de datos de mongo DB
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default conectarDB;
