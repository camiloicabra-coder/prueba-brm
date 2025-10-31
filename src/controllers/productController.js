/**
 * @file Controlador de productos
 * @description Gestiona las operaciones CRUD para los productos del sistema.
 */

const Product = require("../models/product");

/**
 * @api {post} /api/products Crear producto
 * @apiName CrearProducto
 * @apiGroup Productos
 * @apiDescription Crea un nuevo producto en la base de datos.
 * 
 * @apiHeader {String} Authorization Token JWT del usuario autenticado.
 * 
 * @apiBody {String} lote Lote del producto.
 * @apiBody {String} name Nombre del producto.
 * @apiBody {Number} price Precio del producto.
 * @apiBody {Number} quantity Cantidad disponible.
 * @apiBody {Date} entryDate Fecha de ingreso.
 * 
 * @apiSuccess {Number} id ID del producto creado.
 * @apiSuccess {String} name Nombre del producto.
 * @apiSuccess {Number} price Precio.
 * @apiSuccess {Number} quantity Cantidad.
 * @apiSuccessExample {json} Respuesta exitosa:
 * HTTP/1.1 201 Created
 * {
 *   "id": 1,
 *   "name": "Laptop HP",
 *   "price": 2500000,
 *   "quantity": 5,
 *   "entryDate": "2025-10-30"
 * }
 * 
 * @apiError (Error 500) ErrorInterno Error al crear el producto.
 */
exports.createProduct = async (req, res) => {
  try {
    const { lote, name, price, quantity, entryDate } = req.body;
    const newProduct = await Product.create({ lote, name, price, quantity, entryDate });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el producto", error });
  }
};

/**
 * @api {get} /api/products Obtener todos los productos
 * @apiName ObtenerProductos
 * @apiGroup Productos
 * @apiDescription Devuelve la lista completa de productos disponibles.
 * 
 * @apiSuccess {Object[]} products Lista de productos.
 * @apiSuccessExample {json} Respuesta exitosa:
 * HTTP/1.1 200 OK
 * [
 *   { "id": 1, "name": "Laptop HP", "price": 2500000 },
 *   { "id": 2, "name": "Mouse Logitech", "price": 100000 }
 * ]
 * 
 * @apiError (Error 500) ErrorInterno Error al obtener los productos.
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener productos", error });
  }
};

/**
 * @api {get} /api/products/:id Obtener producto por ID
 * @apiName ObtenerProductoPorId
 * @apiGroup Productos
 * @apiDescription Devuelve un producto específico según su ID.
 * 
 * @apiParam {Number} id ID del producto.
 * 
 * @apiSuccess {Number} id ID del producto.
 * @apiSuccess {String} name Nombre del producto.
 * @apiSuccessExample {json} Respuesta exitosa:
 * HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "name": "Laptop HP",
 *   "price": 2500000,
 *   "quantity": 5
 * }
 * 
 * @apiError (Error 404) ProductoNoEncontrado El producto no existe.
 * @apiError (Error 500) ErrorInterno Error al obtener el producto.
 */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener producto", error });
  }
};

/**
 * @api {put} /api/products/:id Actualizar producto
 * @apiName ActualizarProducto
 * @apiGroup Productos
 * @apiDescription Actualiza los datos de un producto existente.
 * 
 * @apiParam {Number} id ID del producto a actualizar.
 * @apiBody {String} [name] Nombre del producto.
 * @apiBody {Number} [price] Precio del producto.
 * @apiBody {Number} [quantity] Cantidad disponible.
 * 
 * @apiSuccessExample {json} Respuesta exitosa:
 * HTTP/1.1 200 OK
 * {
 *   "mensaje": "Producto actualizado correctamente",
 *   "product": { "id": 1, "name": "Laptop HP Actualizada" }
 * }
 * 
 * @apiError (Error 404) ProductoNoEncontrado El producto no existe.
 * @apiError (Error 500) ErrorInterno Error al actualizar el producto.
 */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ mensaje: "Producto no encontrado" });

    await product.update(req.body);
    res.json({ mensaje: "Producto actualizado correctamente", product });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar producto", error });
  }
};

/**
 * @api {delete} /api/products/:id Eliminar producto
 * @apiName EliminarProducto
 * @apiGroup Productos
 * @apiDescription Elimina un producto existente de la base de datos.
 * 
 * @apiParam {Number} id ID del producto a eliminar.
 * 
 * @apiSuccessExample {json} Respuesta exitosa:
 * HTTP/1.1 200 OK
 * {
 *   "mensaje": "Producto eliminado correctamente"
 * }
 * 
 * @apiError (Error 404) ProductoNoEncontrado El producto no existe.
 * @apiError (Error 500) ErrorInterno Error al eliminar el producto.
 */
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ mensaje: "Producto no encontrado" });

    await product.destroy();
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto", error });
  }
};
