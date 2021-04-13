import jwt from "jsonwebtoken";
const crearToken = (usuario, secreta, expiresIn) => {
  const { _id, email } = usuario;
  return jwt.sign({ _id, email }, secreta, { expiresIn });
};

export default crearToken;
