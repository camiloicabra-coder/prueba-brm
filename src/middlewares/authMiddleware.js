/**
 * @file authMiddleware.js
 * @description Middlewares para la verificación de tokens JWT y control de acceso por roles.
 * @requires jsonwebtoken
 */

/**
 * @apiDefine AuthHeader
 * @apiHeader {String} Authorization Token JWT en formato "Bearer <token>".
 * @apiHeaderExample {json} Ejemplo de encabezado:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     }
 */

/**
 * @api {middleware} verificarToken Verificar validez del token JWT
 * @apiName VerificarToken
 * @apiGroup Autenticación
 * @apiVersion 1.0.0
 * 
 * @apiDescription Middleware que valida la autenticidad del token JWT.
 * Si el token es válido, agrega los datos decodificados del usuario al objeto `req.user`
 * para ser utilizados en las siguientes capas de la aplicación.
 * 
 * @apiUse AuthHeader
 * 
 * @apiSuccessExample Ejemplo de uso:
 * router.get('/perfil', verificarToken, (req, res) => {
 *   res.json({ usuario: req.user });
 * });
 * 
 * @apiError (401) TokenNoProporcionado No se envió un token en el encabezado.
 * @apiError (401) TokenInvalido El token proporcionado es inválido o ha expirado.
 * 
 * @apiErrorExample {json} Token no proporcionado:
 * HTTP/1.1 401 Unauthorized
 * {
 *   "mensaje": "Token no proporcionado"
 * }
 * 
 * @apiErrorExample {json} Token inválido o expirado:
 * HTTP/1.1 401 Unauthorized
 * {
 *   "mensaje": "Token inválido o expirado"
 * }
 */

/**
 * @api {middleware} esAdmin Restringir acceso solo a administradores
 * @apiName EsAdmin
 * @apiGroup Autenticación
 * @apiVersion 1.0.0
 * 
 * @apiDescription Middleware que valida si el usuario autenticado tiene el rol **ADMIN**.
 * Debe utilizarse después de `verificarToken`.
 * 
 * @apiUse AuthHeader
 * 
 * @apiSuccessExample Ejemplo de uso:
 * router.delete('/usuarios/:id', verificarToken, esAdmin, eliminarUsuario);
 * 
 * @apiError (403) AccesoDenegado El usuario no tiene permisos de administrador.
 * 
 * @apiErrorExample {json} Acceso denegado:
 * HTTP/1.1 403 Forbidden
 * {
 *   "mensaje": "Acceso denegado. Solo administradores."
 * }
 */

/**
 * @api {middleware} esCliente Restringir acceso solo a clientes
 * @apiName EsCliente
 * @apiGroup Autenticación
 * @apiVersion 1.0.0
 * 
 * @apiDescription Middleware que valida si el usuario autenticado tiene el rol **CLIENT**.
 * Debe utilizarse después de `verificarToken`.
 * 
 * @apiUse AuthHeader
 * 
 * @apiSuccessExample Ejemplo de uso:
 * router.get('/compras', verificarToken, esCliente, obtenerComprasUsuario);
 * 
 * @apiError (403) AccesoDenegado El usuario no tiene permisos de cliente.
 * 
 * @apiErrorExample {json} Acceso denegado:
 * HTTP/1.1 403 Forbidden
 * {
 *   "mensaje": "Acceso denegado. Solo clientes."
 * }
 */

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
