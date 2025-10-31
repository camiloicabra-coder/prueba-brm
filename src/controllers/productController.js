
const Product = require("../models/product");

// Crear producto
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

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener productos", error });
  }
};

// Obtener producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener producto", error });
  }
};

// Actualizar producto
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

// Eliminar producto
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
