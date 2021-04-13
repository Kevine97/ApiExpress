import { response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "variables.env" });

const validarJWT = (req, res = response, next) => {
  //x-token headers

  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      status: "Not found",
      code: 401,
      mensaje: "No hay token en la petición",
    });
  }

  const { _id, email } = jwt.verify(token, process.env.SECRETA);
  req._id = _id;
  req.email = email;
  

  try {
  } catch (error) {
    return res.status(401).json({
      status: "Not found",
      code: 401,
      mensaje: "Token no valido",
    });
  }

  next();
};

export { validarJWT };
