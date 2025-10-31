/**
 * @apiDefine AdminOnly Solo accesible por usuarios con rol ADMIN
 */

/**
 * @api {post} /api/products Crear un producto
 * @apiName CreateProduct
 * @apiGroup Productos
 * @apiPermission AdminOnly
 *
 * @apiHeader {String} Authorization Token JWT válido.
 *
 * @apiBody {String} lote Código del lote del producto.
 * @apiBody {String} name Nombre del producto.
 * @apiBody {Decimal} price Precio del producto.
 * @apiBody {Number} quantity Cantidad disponible.
 * @apiBody {Date} entryDate Fecha de ingreso del producto.
 *
 * @apiSuccess {Number} id ID del producto creado.
 * @apiSuccess {String} lote Lote del producto.
 * @apiSuccess {String} name Nombre del producto.
 * @apiSuccess {Decimal} price Precio del producto.
 * @apiSuccess {Number} quantity Stock disponible.
 * @apiSuccess {Date} entryDate Fecha de ingreso.
 * @apiSuccess {Date} createdAt Fecha de creación del registro.
 * @apiSuccess {Date} updatedAt Fecha de actualización del registro.
 */

/**
 * @api {get} /api/products Obtener todos los productos
 * @apiName GetProducts
 * @apiGroup Productos
 * @apiPermission AdminOnly, Cliente
 *
 * @apiHeader {String} Authorization Token JWT válido.
 *
 * @apiSuccess {Object[]} products Lista de productos.
 * @apiSuccess {Number} products.id ID del producto.
 * @apiSuccess {String} products.lote Lote del producto.
 * @apiSuccess {String} products.name Nombre del producto.
 * @apiSuccess {Decimal} products.price Precio del producto.
 * @apiSuccess {Number} products.quantity Stock disponible.
 * @apiSuccess {Date} products.entryDate Fecha de ingreso.
 */

/**
 * @api {get} /api/products/:id Obtener producto por ID
 * @apiName GetProductById
 * @apiGroup Productos
 * @apiPermission AdminOnly, Cliente
 *
 * @apiHeader {String} Authorization Token JWT válido.
 *
 * @apiParam {Number} id ID del producto a obtener.
 *
 * @apiSuccess {Number} id ID del producto.
 * @apiSuccess {String} lote Lote del producto.
 * @apiSuccess {String} name Nombre del producto.
 * @apiSuccess {Decimal} price Precio del producto.
 * @apiSuccess {Number} quantity Stock disponible.
 * @apiSuccess {Date} entryDate Fecha de ingreso.
 */

/**
 * @api {put} /api/products/:id Actualizar producto
 * @apiName UpdateProduct
 * @apiGroup Productos
 * @apiPermission AdminOnly
 *
 * @apiHeader {String} Authorization Token JWT válido.
 *
 * @apiParam {Number} id ID del producto a actualizar.
 *
 * @apiBody {String} [lote] Código del lote del producto.
 * @apiBody {String} [name] Nombre del producto.
 * @apiBody {Decimal} [price] Precio del producto.
 * @apiBody {Number} [quantity] Cantidad disponible.
 * @apiBody {Date} [entryDate] Fecha de ingreso del producto.
 *
 * @apiSuccess {String} mensaje Confirmación de actualización.
 * @apiSuccess {Object} product Producto actualizado.
 */

/**
 * @api {delete} /api/products/:id Eliminar producto
 * @apiName DeleteProduct
 * @apiGroup Productos
 * @apiPermission AdminOnly
 *
 * @apiHeader {String} Authorization Token JWT válido.
 *
 * @apiParam {Number} id ID del producto a eliminar.
 *
 * @apiSuccess {String} mensaje Confirmación de eliminación.
 */

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verificarToken } = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Crear producto (solo ADMIN)
router.post("/", verificarToken, roleMiddleware("ADMIN"), productController.createProduct);

// Obtener todos los productos (ADMIN o CLIENT)
router.get("/", verificarToken, productController.getProducts);

// Obtener un producto por ID (ADMIN o CLIENT)
router.get("/:id", verificarToken, productController.getProductById);

// Actualizar producto (solo ADMIN)
router.put("/:id", verificarToken, roleMiddleware("ADMIN"), productController.updateProduct);

// Eliminar producto (solo ADMIN)
router.delete("/:id", verificarToken, roleMiddleware("ADMIN"), productController.deleteProduct);

module.exports = router;

