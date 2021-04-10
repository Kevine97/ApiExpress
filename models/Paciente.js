import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pacientesSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  propetario: {
    type: String,
    required: true,
    trim: true,
  },
  fecha: {
    type: String,
    required: true,
    trim: true,
  },
  hora: {
    type: String,
    required: true,
    trim: true,
  },
  sintomas: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model('Pacientes',pacientesSchema);
