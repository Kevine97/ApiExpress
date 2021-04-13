import express from "express";
import {
  nuevoCliente,
  obtenerCliente,
  obtenerClienteId,
  updateCliente,
  deleteCliente,
} from "../controllers/pacienteControllers.js";
import {
  RegistrarPaciente,
  autenticarUsuario,
} from "../controllers/registroContollers.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { check } from "express-validator";
import dotenv from "dotenv";
dotenv.config({ path: "variables.env" });

const cantidadPassword = process.env.CANT_PASSWORD;
const cantidadNombre = process.env.CANT_NOMBRE;

const router = express.Router();
//Agregar una cita
router.post(
  "/pacientes",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("propetario", "El nombre es obligatorio").not().isEmpty(),
    check("fecha", "El nombre es obligatorio").not().isEmpty(),
    check("hora", "El nombre es obligatorio").not().isEmpty(),
    check("sintomas", "El nombre es obligatorio").not().isEmpty(),
  ],
  validarJWT,
  nuevoCliente
);
//Obetener todos clientes registrados
router.get("/pacientes", validarJWT, obtenerCliente);
//Obetener un cliente en especifico
router.get("/pacientes/:id", validarJWT, obtenerClienteId);
//Actualizamos un regsitro
router.put(
  "/pacientes/:id",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("propetario", "El nombre es obligatorio").not().isEmpty(),
    check("fecha", "El nombre es obligatorio").not().isEmpty(),
    check("hora", "El nombre es obligatorio").not().isEmpty(),
    check("sintomas", "El nombre es obligatorio").not().isEmpty(),
  ],
  validarJWT,
  updateCliente
);
//Eliminamos un regsitro
router.delete("/pacientes/:id", validarJWT, deleteCliente);

//Registrar los clientes de
router.post(
  "/registrarPaciente",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre", "El nombre debe tener 6 caracteres").isLength({
      min: cantidadNombre,
    }),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe tener 6 caracteres").isLength({
      min: cantidadPassword,
    }),
  ],
  RegistrarPaciente
);
router.post("/autenticarPaciente", autenticarUsuario);
export default router;
