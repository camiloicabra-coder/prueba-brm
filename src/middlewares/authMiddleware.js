const jwt = require("jsonwebtoken");

// Middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // El token debe venir con formato: "Bearer <token>"
    if (!authHeader) {
      return res.status(401).json({ mensaje: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mi_secreto");

    // Agregamos los datos del usuario al request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};

// Middleware para verificar rol de ADMIN
const esAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ mensaje: "Acceso denegado. Solo administradores." });
  }
  next();
};

// Middleware para verificar rol de CLIENT
const esCliente = (req, res, next) => {
  if (req.user.role !== "CLIENT") {
    return res.status(403).json({ mensaje: "Acceso denegado. Solo clientes." });
  }
  next();
};

module.exports = { verificarToken, esAdmin, esCliente };
