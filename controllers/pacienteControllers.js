import Paciente from "../models/Paciente.js";
import crearToken from "../helpers/GenerarToke.js";
import { validationResult } from "express-validator";

import dotenv from "dotenv";
dotenv.config({ path: "variables.env" });

//Agrega una cita al paciente
const nuevoCliente = async (req, res, next) => {
  const paciente = new Paciente(req.body);

  try {
    const { nombre, propetario, fecha, hora, sintomas } = paciente;

    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        status: "Not found",
        code: 400,
        mensaje: error.mapped(),
      });
    }

    const { _id, name, email } = req;

    const token = await crearToken({ _id, email }, process.env.SECRETA, "2hr");

    paciente.creador = _id;
    const pacientes = await paciente.save();
    res.status(200).json({
      status: "OK",
      code: 200,
      mensaje: "Usuario Agregado",
      datos: pacientes,
      token,
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

//Obtiene todos los clientes
const obtenerCliente = async (req, res, next) => {
  try {
    const { _id, name, email } = req;
    const paciente = await Paciente.find({ creador: _id });
    res.json(paciente);
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

//Obtiene un cliente especifico
const obtenerClienteId = async (req, res, next) => {
  try {
    const { _id, name, email } = req;
    const paciente = await Paciente.findById(req.params.id)
      .where("creador")
      .equals(_id);
    res.json(paciente);
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

const updateCliente = async (req, res, next) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        status: "Not found",
        code: 400,
        mensaje: error.mapped(),
      });
    }
    const { _id, name, email } = req;

    const existe = await Paciente.findOne({ _id: req.params.id, creador: _id });

    if (!existe) {
      return res.status(501).json({
        status: "Not found",
        code: 501,
        mensaje: "No tiene permiso para editar este registro",
      });
    }

    const paciente = await Paciente.findOneAndUpdate(
      { _id: req.params.id, creador: _id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "OK",
      code: 200,
      mensaje: "Usuario actualizado",
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

const deleteCliente = async (req, res, next) => {
  try {
    const { _id, name, email } = req;

    const existe = await Paciente.findOne({ _id: req.params.id, creador: _id });
    
    if (!existe) {
      return res.status(501).json({
        status: "Not found",
        code: 501,
        mensaje: "No tiene permiso para eliminar este registro",
      });
    }


    const paciente = await Paciente.findOneAndDelete({
      _id: req.params.id,
      creador: _id,
    });
    res.status(200).json({
      status: "OK",
      code: 200,
      mensaje: "Usuario eliminado",
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

export {
  nuevoCliente,
  obtenerCliente,
  obtenerClienteId,
  updateCliente,
  deleteCliente,
};
