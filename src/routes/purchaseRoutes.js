
const express = require("express");
const router = express.Router();
const {
  registrarCompra,
  obtenerCompras,
  obtenerComprasPorUsuario,
  obtenerCompraPorId,
  obtenerHistorialCliente
} = require("../controllers/purchaseController");

const { verificarToken, esAdmin, esCliente } = require("../middlewares/authMiddleware");

// Registrar una compra (solo CLIENTE)
router.post("/", verificarToken, esCliente, registrarCompra);

// Obtener todas las compras (solo ADMIN)
router.get("/", verificarToken, esAdmin, obtenerCompras);

// Obtener compras de un usuario específico (solo ADMIN)
router.get("/user/:userId", verificarToken, esAdmin, obtenerComprasPorUsuario);

// Obtener historial de compras del cliente autenticado
router.get("/my/history", verificarToken, esCliente, obtenerHistorialCliente);

// Ver factura específica (solo CLIENTE autenticado)
router.get("/:id", verificarToken, esCliente, obtenerCompraPorId);

module.exports = router;
