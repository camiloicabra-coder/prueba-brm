
const { Sale, SaleItem, Product, User } = require('../models');

exports.createSale = async (req, res) => {
  try {
    const { userId, items } = req.body;

    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ mensaje: 'Datos incompletos: se requiere userId y lista de productos.' });
    }

    let total = 0;
    const saleItems = [];

    // Validar existencia de productos y stock
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        return res.status(404).json({ mensaje: `Producto con ID ${item.productId} no encontrado.` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({ mensaje: `Stock insuficiente para el producto ${product.name}.` });
      }

      const subtotal = parseFloat(product.price) * item.quantity;
      total += subtotal;

      saleItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
        subtotal
      });

      //  Descontar stock
      product.quantity -= item.quantity;
      await product.save();
    }

    //  Crear venta
    const sale = await Sale.create({ userId, total });

    // Crear los items de la venta
    for (const si of saleItems) {
      await SaleItem.create({ ...si, saleId: sale.id });
    }

    res.status(201).json({
      mensaje: 'Venta registrada exitosamente',
      factura: {
        id: sale.id,
        fecha: sale.date,
        cliente: userId,
        total,
        productos: saleItems
      }
    });
  } catch (error) {
    console.error('Error al registrar venta:', error);
    res.status(500).json({ mensaje: 'Error interno al registrar la venta', error: error.message });
  }
};

// Obtener todas las ventas (para ADMIN)
/*exports.getAllSales = async (req, res) => {
  try {
    const ventas = await Sale.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: SaleItem, as: 'items', include: [{ model: Product, as: 'product' }] }
      ]
    });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las ventas', error: error.message });
  }
};*/
// src/controllers/saleController.js
exports.getAllSales = async (req, res) => {
  try {
    const ventas = await Sale.findAll({
      include: [
        { model: User, as: 'user', attributes: ['name', 'email'] },
        {
          model: SaleItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['name', 'price'] }]
        }
      ]
    });

    const respuesta = ventas.map(venta => ({
      fecha: venta.date,
      cliente: {
        nombre: venta.user?.name || 'Sin nombre',
        email: venta.user?.email || 'Sin correo'
      },
      productos: venta.items.map(item => ({
        nombre: item.product.name,
        cantidad: item.quantity,
        precioUnitario: parseFloat(item.price),
        subtotal: parseFloat(item.subtotal)
      })),
      totalCompra: parseFloat(venta.total)
    }));

    res.json(respuesta);
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).json({ mensaje: 'Error al obtener las ventas', error: error.message });
  }
};


// Historial de ventas por usuario
/*exports.getSalesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const ventas = await Sale.findAll({
      where: { userId },
      include: [
        { model: SaleItem, as: 'items', include: [{ model: Product, as: 'product' }] }
      ]
    });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el historial de ventas', error: error.message });
  }
};*/
// src/controllers/saleController.js
exports.getSalesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const ventas = await Sale.findAll({
      where: { userId },
      include: [
        { model: User, as: 'user', attributes: ['name', 'email'] },
        {
          model: SaleItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['name', 'price'] }]
        }
      ]
    });

    const respuesta = ventas.map(venta => ({
      fecha: venta.date,
      cliente: {
        nombre: venta.user?.name || 'Sin nombre',
        email: venta.user?.email || 'Sin correo'
      },
      productos: venta.items.map(item => ({
        nombre: item.product.name,
        cantidad: item.quantity,
        precioUnitario: parseFloat(item.price),
        subtotal: parseFloat(item.subtotal)
      })),
      totalCompra: parseFloat(venta.total)
    }));

    res.json(respuesta);
  } catch (error) {
    console.error('Error al obtener el historial de ventas:', error);
    res.status(500).json({ mensaje: 'Error al obtener el historial de ventas', error: error.message });
  }
};

