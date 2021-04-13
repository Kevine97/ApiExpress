import Registrar from "../models/Registrar.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import crearToken from "../helpers/GenerarToke.js";
dotenv.config({ path: "variables.env" });

const RegistrarPaciente = async (req, res, next) => {
  const paciente = new Registrar(req.body);

  try {
    const { nombre, email, password } = paciente;
    const existe = await Registrar.findOne({ email: email });

    if (existe) {
      res.json({ mensaje: "Usuario ya existe" });
      return;
    }

    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        status: "Not found",
        code: 400,
        mensaje: error.mapped(),
      });
    }

    //Hashear password
    const salt = await bcryptjs.genSalt(10);
    paciente.password = await bcryptjs.hash(password, salt);

    const pacientes = await paciente.save();
    res.status(200).json({
      status: "OK",
      code: 200,
      mensaje: "Usuario Agregado",
      datos: pacientes,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      status: "Not found",
      code: 501,
      mensaje: "Hubo un error inesperadamente",
    });
    next();
  }
};

const autenticarUsuario = async (req, res, next) => {
  const paciente = new Registrar(req.body);

  try {
    const { nombre, email, password } = paciente;
    const existe = await Registrar.findOne({ email: email });


    if (!existe) {
      res.json({ mensaje: "Usuario no existe" });
      return;
    }

    const passwordCorrecto = await bcryptjs.compare(password, existe.password);

    if (!passwordCorrecto) {
      res.json({ mensaje: "Password incorrecto" });
      return;
    }

    //Dar acceso a la App
    res.json({
      token: crearToken(existe, process.env.SECRETA, "2hr"),
      status: "OK",
      code: 200,
      datos: paciente,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      status: "Not found",
      code: 501,
      mensaje: "Hubo un error inesperadamente",
    });
    next();
  }
};

export { RegistrarPaciente, autenticarUsuario };
