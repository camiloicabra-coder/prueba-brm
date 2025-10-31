/**
 * @apiDefine AdminOnly Solo accesible por usuarios con rol ADMIN
 */

/**
 * @apiDefine ClientOnly Solo accesible por usuarios con rol CLIENT
 */

/**
 * @api {post} /api/purchases Registrar una compra
 * @apiName RegistrarCompra
 * @apiGroup Compras
 * @apiPermission ClientOnly
 *
 * @apiHeader {String} Authorization Token JWT válido.
 *
 * @apiBody {Object[]} items Lista de productos a comprar.
 * @apiBody {Number} items.productId ID del producto.
 * @apiBody {Number} items.quantity Cantidad del producto.
 *
 * @apiSuccess {String} mensaje Confirmación de registro.
 * @apiSuccess {Object} factura Detalles de la compra registrada.
 * @apiSuccess {Number} factura.id ID de la compra.
 * @apiSuccess {Date} factura.fecha Fecha de la compra.
 * @apiSuccess {Number} factura.cliente ID del cliente.
 * @apiSuccess {Object[]} factura.productos Lista de productos comprados.
 * @apiSuccess {String} factura.productos.nombre Nombre del producto.
 * @apiSuccess {Number} factura.productos.cantidad Cantidad comprada.
 * @apiSuccess {Number} factura.productos.precioUnitario Precio unitario.
 * @apiSuccess {Number} factura.productos.subtotal Subtotal del producto.
 * @apiSuccess {Number} factura.totalCompra Total de la compra.
 */

/**
 * @api {get} /api/purchases Obtener todas las compras
 * @apiName ObtenerCompras
 * @apiGroup Compras
 * @apiPermission AdminOnly
 *
 * @apiHeader {String} Authorization Token JWT válido.
 *
 * @apiSuccess {Object[]} compras Lista de compras.
 * @apiSuccess {Number} compras.id ID de la compra.
 * @apiSuccess {Date} compras.fecha Fecha de la compra.
 * @apiSuccess {Object} compras.cliente Información del cliente.
 * @apiSuccess {String} compras.cliente.nombre Nombre del cliente.
 * @apiSuccess {String} compras.cliente.email Correo del cliente.
 * @apiSuccess {Object[]} compras.productos Productos de la compra.
 * @apiSuccess {String} compras.productos.nombre Nombre del producto.
 * @apiSuccess {Number} compras.productos.cantidad Cantidad comprada.
 * @apiSuccess {Number} compras.productos.precioUnitario Precio unitario.
 * @apiSuccess {Number} compras.productos.subtotal Subtotal del producto.
 * @apiSuccess {Number} compras.totalCompra Total de la compra.
 */

/**
 * @api {get} /api/purchases/user/:userId Obtener compras de un usuario específico
 * @apiName ObtenerComprasPorUsuario
 * @apiGroup Compras
 * @apiPermission AdminOnly
 *
 * @apiHeader {String} Authorization Token JWT válido.
 *
 * @apiParam {Number} userId ID del usuario.
 *
 * @apiSuccess {Object[]} compras Lista de compras del usuario.
 */

/**
 * @api {get} /api/purchases/my/history Obtener historial de compras del cliente autenticado
 * @apiName ObtenerHistorialCliente
 * @apiGroup Compras
 * @apiPermission ClientOnly
 *
 * @apiHeader {String} Authorization Token JWT válido.
 *
 * @apiSuccess {Object[]} historial Lista de compras del cliente.
 * @apiSuccess {Number} historial.id ID de la compra.
 * @apiSuccess {Date} historial.fecha Fecha de la compra.
 * @apiSuccess {Number} historial.totalCompra Total de la compra.
 * @apiSuccess {Object[]} historial.productos Productos de la compra.
 * @apiSuccess {String} historial.productos.nombre Nombre del producto.
 * @apiSuccess {Number} historial.productos.cantidad Cantidad comprada.
 * @apiSuccess {Number} historial.productos.precioUnitario Precio unitario.
 * @apiSuccess {Number} historial.productos.subtotal Subtotal del producto.
 */

/**
 * @api {get} /api/purchases/:id Ver factura específica
 * @apiName ObtenerCompraPorId
 * @apiGroup Compras
 * @apiPermission ClientOnly
 *
 * @apiHeader {String} Authorization Token JWT válido.
 *
 * @apiParam {Number} id ID de la compra.
 *
 * @apiSuccess {Object} factura Detalles de la compra.
 * @apiSuccess {Number} factura.id ID de la compra.
 * @apiSuccess {Date} factura.fecha Fecha de la compra.
 * @apiSuccess {Object} factura.cliente Información del cliente.
 * @apiSuccess {String} factura.cliente.nombre Nombre del cliente.
 * @apiSuccess {String} factura.cliente.email Correo del cliente.
 * @apiSuccess {Object[]} factura.productos Productos de la compra.
 * @apiSuccess {String} factura.productos.nombre Nombre del producto.
 * @apiSuccess {Number} factura.productos.cantidad Cantidad comprada.
 * @apiSuccess {Number} factura.productos.precioUnitario Precio unitario.
 * @apiSuccess {Number} factura.productos.subtotal Subtotal del producto.
 * @apiSuccess {Number} factura.totalCompra Total de la compra.
 */

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
