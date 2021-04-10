import Paciente from "../models/Paciente.js";

//Agrega un nuevo cliente
const nuevoCliente = async (req, res, next) => {
  const paciente = new Paciente(req.body);

  try {
    const { nombre, propetario, fecha, hora, sintomas } = paciente;

    if (
      nombre.trim() === "" ||
      propetario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      res.json({ mensaje: "Los campos no pueden quedar datos vacios" });
      return;
    }
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

//Obtiene todos los clientes
const obtenerCliente = async (req, res, next) => {
  try {
    const paciente = await Paciente.find({});
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
    const paciente = await Paciente.findById(req.params.id);
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
  const { nombre, propetario, fecha, hora, sintomas } = req.body;
  try {
    if (
      nombre.trim() === "" ||
      propetario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      res.json({ mensaje: "Los campos no pueden quedar datos vacios" });
      return;
    }

    const paciente = await Paciente.findOneAndUpdate(
      { _id: req.params.id },
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

    const paciente = await Paciente.findOneAndDelete({_id: req.params.id})
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
