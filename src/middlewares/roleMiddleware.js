
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
