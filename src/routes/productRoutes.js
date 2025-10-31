
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verificarToken } = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

//  Rutas de productos

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
