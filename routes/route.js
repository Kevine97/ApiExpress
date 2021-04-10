import express from "express";
import {
  nuevoCliente,
  obtenerCliente,
  obtenerClienteId,
  updateCliente,
  deleteCliente
} from "../controllers/pacienteControllers.js";

const router = express.Router();
//Agregar un cliente
router.post("/pacientes", nuevoCliente);
//Obetener todos clientes registrados
router.get("/pacientes", obtenerCliente);
//Obetener un cliente en especifico
router.get("/pacientes/:id", obtenerClienteId);
//Actualizamos un regsitro
router.put("/pacientes/:id", updateCliente);
//Eliminamos un regsitro
router.delete("/pacientes/:id", deleteCliente);
export default router;
