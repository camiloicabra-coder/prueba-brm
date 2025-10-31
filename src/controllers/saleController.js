/**
 * @file saleController.js
 * @description Controlador para la gestión de ventas y su historial.
 */

const { Sale, SaleItem, Product, User } = require('../models');

/**
 * @api {post} /api/sales Registrar una venta
 * @apiName CrearVenta
 * @apiGroup Ventas
 * @apiDescription Registra una nueva venta asociada a un usuario y actualiza el stock de los productos.
 *
 * @apiBody {Number} userId ID del usuario que realiza la venta.
 * @apiBody {Object[]} items Lista de productos vendidos.
 * @apiBody {Number} items.productId ID del producto.
 * @apiBody {Number} items.quantity Cantidad vendida.
 *
 * @apiSuccess {String} mensaje Mensaje de confirmación.
 * @apiSuccess {Object} factura Información detallada de la venta registrada.
 * @apiSuccess {Number} factura.id ID de la venta.
 * @apiSuccess {String} factura.fecha Fecha de creación de la venta.
 * @apiSuccess {Number} factura.cliente ID del cliente.
 * @apiSuccess {Number} factura.total Total de la venta.
 * @apiSuccess {Object[]} factura.productos Productos vendidos con su cantidad y subtotal.
 *
 * @apiError (400) DatosIncompletos Faltan datos requeridos como userId o items.
 * @apiError (404) ProductoNoEncontrado El producto no existe.
 * @apiError (400) StockInsuficiente No hay suficiente stock disponible.
 * @apiError (500) ErrorInterno Error inesperado en el servidor.
 */
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

      // Descontar stock
      product.quantity -= item.quantity;
      await product.save();
    }

    // Crear venta
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

/**
 * @api {get} /api/sales Obtener todas las ventas
 * @apiName ObtenerVentas
 * @apiGroup Ventas
 * @apiDescription Devuelve todas las ventas registradas con información del cliente y productos.
 *
 * @apiSuccess {Object[]} ventas Lista de ventas con sus detalles.
 * @apiSuccess {String} ventas.fecha Fecha de la venta.
 * @apiSuccess {Object} ventas.cliente Información del cliente.
 * @apiSuccess {Object[]} ventas.productos Productos vendidos con precio y cantidad.
 * @apiSuccess {Number} ventas.totalCompra Total de la venta.
 *
 * @apiError (500) ErrorInterno Error al obtener las ventas.
 */
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

/**
 * @api {get} /api/sales/user/:userId Obtener ventas por usuario
 * @apiName ObtenerVentasPorUsuario
 * @apiGroup Ventas
 * @apiDescription Devuelve el historial de ventas de un usuario específico.
 *
 * @apiParam {Number} userId ID del usuario.
 *
 * @apiSuccess {Object[]} ventas Lista de ventas realizadas por el usuario.
 * @apiSuccess {String} ventas.fecha Fecha de la venta.
 * @apiSuccess {Object} ventas.cliente Información del cliente.
 * @apiSuccess {Object[]} ventas.productos Productos vendidos.
 * @apiSuccess {Number} ventas.totalCompra Total de la venta.
 *
 * @apiError (500) ErrorInterno Error al obtener el historial de ventas.
 */
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
