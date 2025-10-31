/**
 * @file Controlador para la gestión de compras.
 * @description Maneja la creación, consulta y obtención del historial de compras de los usuarios y administradores.
 */

const { Purchase, PurchaseItem, Product, User } = require('../models');

/**
 * @api {post} /api/purchases Registrar una nueva compra
 * @apiName RegistrarCompra
 * @apiGroup Compras
 * @apiHeader {String} Authorization Token JWT del usuario autenticado.
 *
 * @apiBody {Object[]} items Lista de productos comprados.
 * @apiBody {Number} items.productId ID del producto.
 * @apiBody {Number} items.quantity Cantidad del producto.
 *
 * @apiSuccess {String} mensaje Confirmación del registro.
 * @apiSuccess {Object} factura Información de la compra generada.
 *
 * @apiError (Error 400) mensaje Lista de productos vacía o inválida.
 * @apiError (Error 404) mensaje Producto no encontrado.
 * @apiError (Error 500) mensaje Error interno al registrar la compra.
 */
const registrarCompra = async (req, res) => {
  const { items } = req.body;
  const userId = req.user.id;

  if (req.body.userId && req.body.userId !== req.user.id) {
    return res.status(403).json({ mensaje: 'No puedes registrar compras en nombre de otro usuario.' });
  }

  try {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ mensaje: 'Debe incluir una lista de productos en la compra.' });
    }

    let total = 0;
    const purchaseItems = [];

    const compra = await Purchase.create({
      total: 0,
      userId,
    });

    for (const item of items) {
      const producto = await Product.findByPk(item.productId);
      if (!producto) {
        return res.status(404).json({ mensaje: `Producto con ID ${item.productId} no encontrado.` });
      }

      const subtotal = parseFloat(producto.price) * item.quantity;
      total += subtotal;

      await PurchaseItem.create({
        purchaseId: compra.id,
        productId: producto.id,
        quantity: item.quantity,
        price: producto.price,
        subtotal,
      });

      producto.quantity -= item.quantity;
      if (producto.quantity < 0) {
        return res.status(400).json({ mensaje: `No hay suficiente stock de ${producto.name}` });
      }
      await producto.save();

      purchaseItems.push({
        nombre: producto.name,
        cantidad: item.quantity,
        precioUnitario: parseFloat(producto.price),
        subtotal,
      });
    }

    compra.total = total;
    await compra.save();

    res.status(201).json({
      mensaje: 'Compra registrada exitosamente',
      factura: {
        id: compra.id,
        fecha: compra.createdAt,
        cliente: req.user.id,
        productos: purchaseItems,
        totalCompra: total,
      },
    });
  } catch (error) {
    console.error('Error al registrar la compra:', error);
    res.status(500).json({ mensaje: 'Error interno al registrar la compra', error: error.message });
  }
};

/**
 * @api {get} /api/purchases Obtener todas las compras
 * @apiName ObtenerCompras
 * @apiGroup Compras
 * @apiHeader {String} Authorization Token JWT de un usuario ADMIN.
 *
 * @apiSuccess {Object[]} compras Lista de todas las compras realizadas.
 * @apiError (Error 500) mensaje Error al obtener las compras.
 */
const obtenerCompras = async (req, res) => {
  try {
    const compras = await Purchase.findAll({
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        {
          model: PurchaseItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['name', 'price'] }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    const comprasValidas = compras.filter(c => c.items.length > 0);

    const respuesta = comprasValidas.map(compra => ({
      id: compra.id,
      fecha: compra.createdAt,
      cliente: compra.user
        ? {
            id: compra.user.id,
            nombre: compra.user.name,
            email: compra.user.email,
          }
        : {
            id: null,
            nombre: 'Usuario no encontrado',
            email: 'Desconocido',
          },
      productos: compra.items.map(item => ({
        nombre: item.product?.name || 'Producto eliminado',
        cantidad: item.quantity,
        precioUnitario: parseFloat(item.price),
        subtotal: parseFloat(item.subtotal),
      })),
      totalCompra: parseFloat(compra.total),
    }));

    res.json(respuesta);
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    res.status(500).json({ mensaje: 'Error al obtener las compras', error: error.message });
  }
};

/**
 * @api {get} /api/purchases/user/:userId Obtener compras de un usuario específico
 * @apiName ObtenerComprasPorUsuario
 * @apiGroup Compras
 * @apiHeader {String} Authorization Token JWT de un usuario ADMIN.
 *
 * @apiParam {Number} userId ID del usuario.
 * @apiSuccess {Object[]} compras Lista de compras realizadas por el usuario.
 * @apiError (Error 404) mensaje Usuario sin compras registradas.
 * @apiError (Error 500) mensaje Error al obtener las compras del usuario.
 */
const obtenerComprasPorUsuario = async (req, res) => {
  try {
    const { userId } = req.params;

    const compras = await Purchase.findAll({
      where: { userId },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        {
          model: PurchaseItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['name', 'price'] }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    const comprasValidas = compras.filter(compra => compra.items.length > 0);

    if (!comprasValidas.length) {
      return res.status(404).json({ mensaje: 'Este usuario no tiene compras registradas con productos.' });
    }

    const respuesta = comprasValidas.map(compra => ({
      id: compra.id,
      fecha: compra.createdAt,
      cliente: compra.user
        ? {
            id: compra.user.id,
            nombre: compra.user.name,
            email: compra.user.email,
          }
        : {
            id: null,
            nombre: 'Usuario no encontrado',
            email: 'Desconocido',
          },
      productos: compra.items.map(item => ({
        nombre: item.product?.name || 'Producto eliminado',
        cantidad: item.quantity,
        precioUnitario: parseFloat(item.price),
        subtotal: parseFloat(item.subtotal),
      })),
      totalCompra: parseFloat(compra.total),
    }));

    res.json(respuesta);
  } catch (error) {
    console.error('Error al obtener compras del usuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener compras del usuario', error: error.message });
  }
};

/**
 * @api {get} /api/purchases/:id Obtener una compra específica
 * @apiName ObtenerCompraPorId
 * @apiGroup Compras
 * @apiHeader {String} Authorization Token JWT del usuario autenticado.
 *
 * @apiParam {Number} id ID de la compra.
 * @apiSuccess {Object} compra Información detallada de la factura.
 * @apiError (Error 403) mensaje Acceso denegado a la compra.
 * @apiError (Error 404) mensaje Compra no encontrada.
 */
const obtenerCompraPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const purchase = await Purchase.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        {
          model: PurchaseItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['name', 'price'] }],
        },
      ],
    });

    if (!purchase) {
      return res.status(404).json({ mensaje: 'Compra no encontrada.' });
    }

    if (purchase.userId !== userId) {
      return res.status(403).json({ mensaje: 'No tienes permiso para ver esta factura.' });
    }

    const respuesta = {
      id: purchase.id,
      fecha: purchase.createdAt,
      cliente: purchase.user
        ? {
            id: purchase.user.id,
            nombre: purchase.user.name,
            email: purchase.user.email,
          }
        : {
            id: null,
            nombre: 'Usuario no encontrado',
            email: 'Desconocido',
          },
      productos: purchase.items.map(item => ({
        nombre: item.product?.name || 'Producto eliminado',
        cantidad: item.quantity,
        precioUnitario: parseFloat(item.price),
        subtotal: parseFloat(item.subtotal),
      })),
      totalCompra: parseFloat(purchase.total),
    };

    res.json(respuesta);
  } catch (error) {
    console.error('Error al obtener la compra por ID:', error);
    res.status(500).json({ mensaje: 'Error al obtener la compra por ID', error: error.message });
  }
};

/**
 * @api {get} /api/purchases/history Historial de compras del cliente autenticado
 * @apiName ObtenerHistorialCliente
 * @apiGroup Compras
 * @apiHeader {String} Authorization Token JWT del usuario autenticado.
 *
 * @apiSuccess {Object[]} compras Historial de compras del usuario.
 * @apiError (Error 404) mensaje No tienes compras registradas.
 */
const obtenerHistorialCliente = async (req, res) => {
  try {
    const userId = req.user.id;

    const compras = await Purchase.findAll({
      where: { userId },
      include: [
        {
          model: PurchaseItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['name', 'price'] }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (!compras.length) {
      return res.status(404).json({ mensaje: 'No tienes compras registradas.' });
    }

    const respuesta = compras.map(compra => ({
      id: compra.id,
      fecha: compra.createdAt,
      totalCompra: parseFloat(compra.total),
      productos: compra.items.map(item => ({
        nombre: item.product?.name || 'Producto eliminado',
        cantidad: item.quantity,
        precioUnitario: parseFloat(item.price),
        subtotal: parseFloat(item.subtotal),
      })),
    }));

    res.json(respuesta);
  } catch (error) {
    console.error('Error al obtener el historial del cliente:', error);
    res.status(500).json({ mensaje: 'Error al obtener el historial de compras', error: error.message });
  }
};

module.exports = {
  registrarCompra,
  obtenerCompras,
  obtenerComprasPorUsuario,
  obtenerCompraPorId,
  obtenerHistorialCliente,
};
