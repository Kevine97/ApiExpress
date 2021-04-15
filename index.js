import express from "express";
import conectarDB from "./config/db.js";
import router from "./routes/route.js";
import cors from "cors";


//Crear el servidor
const app = express();

const whitelist = ["http://localhost:4000",'http://localhost:5500'];

const corsOptions = {
  
  origin: (origin, callback) => {
    console.log(origin);
    const existe = whitelist.some((dominio) => dominio === origin);

    if (existe) {
      callback(null, true);
    } else {
      callback(new Error("No tiene permiso para utlizar esta API REST"));
    }
  },
};

//Habilitar cors
app.use( cors(corsOptions) );

//conectar a la DBR
conectarDB();

const port = process.env.PORT || 4000;

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

//Agregar Router
app.use("/", router);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});
