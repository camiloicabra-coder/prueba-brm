/**
 * @apiDefine AdminOnly Solo accesible por usuarios con rol ADMIN
 */

/**
 * @apiDefine ClientOnly Solo accesible por usuarios con rol CLIENT
 */

/**
 * @api {post} /api/sales Registrar una venta
 * @apiName CrearVenta
 * @apiGroup Ventas
 *
 * @apiBody {Number} userId ID del usuario que realiza la venta.
 * @apiBody {Object[]} items Lista de productos de la venta.
 * @apiBody {Number} items.productId ID del producto.
 * @apiBody {Number} items.quantity Cantidad del producto.
 *
 * @apiSuccess {String} mensaje Confirmación de registro.
 * @apiSuccess {Object} factura Detalles de la venta registrada.
 * @apiSuccess {Number} factura.id ID de la venta.
 * @apiSuccess {Date} factura.fecha Fecha de la venta.
 * @apiSuccess {Number} factura.cliente ID del cliente.
 * @apiSuccess {Number} factura.total Total de la venta.
 * @apiSuccess {Object[]} factura.productos Lista de productos vendidos.
 * @apiSuccess {String} factura.productos.nombre Nombre del producto.
 * @apiSuccess {Number} factura.productos.cantidad Cantidad vendida.
 * @apiSuccess {Number} factura.productos.precioUnitario Precio unitario.
 * @apiSuccess {Number} factura.productos.subtotal Subtotal del producto.
 */

/**
 * @api {get} /api/sales Obtener todas las ventas
 * @apiName ObtenerVentas
 * @apiGroup Ventas
 * @apiPermission AdminOnly
 *
 * @apiSuccess {Object[]} ventas Lista de ventas.
 * @apiSuccess {Date} ventas.fecha Fecha de la venta.
 * @apiSuccess {Object} ventas.cliente Información del cliente.
 * @apiSuccess {String} ventas.cliente.nombre Nombre del cliente.
 * @apiSuccess {String} ventas.cliente.email Correo del cliente.
 * @apiSuccess {Object[]} ventas.productos Productos de la venta.
 * @apiSuccess {String} ventas.productos.nombre Nombre del producto.
 * @apiSuccess {Number} ventas.productos.cantidad Cantidad vendida.
 * @apiSuccess {Number} ventas.productos.precioUnitario Precio unitario.
 * @apiSuccess {Number} ventas.productos.subtotal Subtotal del producto.
 * @apiSuccess {Number} ventas.totalCompra Total de la venta.
 */

/**
 * @api {get} /api/sales/user/:userId Obtener historial de ventas por usuario
 * @apiName ObtenerVentasPorUsuario
 * @apiGroup Ventas
 * @apiPermission AdminOnly
 *
 * @apiParam {Number} userId ID del usuario.
 *
 * @apiSuccess {Object[]} ventas Lista de ventas del usuario.
 * @apiSuccess {Date} ventas.fecha Fecha de la venta.
 * @apiSuccess {Object} ventas.cliente Información del cliente.
 * @apiSuccess {String} ventas.cliente.nombre Nombre del cliente.
 * @apiSuccess {String} ventas.cliente.email Correo del cliente.
 * @apiSuccess {Object[]} ventas.productos Productos de la venta.
 * @apiSuccess {String} ventas.productos.nombre Nombre del producto.
 * @apiSuccess {Number} ventas.productos.cantidad Cantidad vendida.
 * @apiSuccess {Number} ventas.productos.precioUnitario Precio unitario.
 * @apiSuccess {Number} ventas.productos.subtotal Subtotal del producto.
 * @apiSuccess {Number} ventas.totalCompra Total de la venta.
 */

const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');

// Registrar una venta
router.post('/', saleController.createSale);

// Obtener todas las ventas
router.get('/', saleController.getAllSales);

// Obtener historial de ventas por usuario
router.get('/user/:userId', saleController.getSalesByUser);

module.exports = router;
