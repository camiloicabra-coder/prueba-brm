/**
 * @file roleMiddleware.js
 * @description Middleware para verificar el rol de un usuario según el rol requerido en la ruta.
 * @version 1.0.0
 */

/**
 * @apiDefine AuthHeader
 * @apiHeader {String} Authorization Token JWT en formato: `Bearer <token>`
 *
 * @apiSuccessExample Ejemplo de uso:
 * ```js
 * // Solo usuarios con rol ADMIN pueden acceder
 * app.get("/admin/dashboard", verificarToken, verificarRol("ADMIN"), (req, res) => {
 *   res.json({ mensaje: "Bienvenido al panel de administrador" });
 * });
 * ```
 *
 * @apiError (Error 401) NoAutenticado El usuario no ha iniciado sesión.
 * @apiError (Error 403) NoAutorizado El usuario no tiene permisos para realizar esta acción.
 *
 * @apiErrorExample {json} No autenticado:
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "mensaje": "No autenticado"
 *   }
 *
 * @apiErrorExample {json} No autorizado:
 *   HTTP/1.1 403 Forbidden
 *   {
 *     "mensaje": "No autorizado para esta acción"
 *   }
 */

module.exports = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user; // viene del authMiddleware
    if (!user) {
      return res.status(401).json({ mensaje: "No autenticado" });
    }

    if (user.role.toUpperCase() !== requiredRole.toUpperCase()) {
      return res.status(403).json({ mensaje: "No autorizado para esta acción" });
    }

    next();
  };
};

