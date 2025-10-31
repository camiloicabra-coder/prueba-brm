/**
 * @file models/index.js
 * @description Configuración de modelos y relaciones de la base de datos usando Sequelize.
 * @version 1.0.0
 */

const { sequelize } = require('../config/database');
const User = require('./user');
const Product = require('./product');
const Purchase = require('./purchase');
const PurchaseItem = require('./purchaseItem');
const Sale = require('./sale');
const SaleItem = require('./saleItem');

/**
 * -----------------------------
 * Relaciones de Compras
 * -----------------------------
 */

/**
 * @api {relation} User->Purchase Relación Usuario -> Compras
 * @apiDescription Un usuario puede tener muchas compras (1:N)
 */
User.hasMany(Purchase, { foreignKey: 'userId', as: 'purchases' });
Purchase.belongsTo(User, { foreignKey: 'userId', as: 'user' });

/**
 * @api {relation} Purchase<->Product Relación Compra <-> Producto
 * @apiDescription Relación N:M entre compras y productos a través de PurchaseItem
 */
Purchase.belongsToMany(Product, { through: PurchaseItem, foreignKey: 'purchaseId', otherKey: 'productId', as: 'products' });
Product.belongsToMany(Purchase, { through: PurchaseItem, foreignKey: 'productId', otherKey: 'purchaseId', as: 'purchases' });

/**
 * Relación directa Compra -> Items y Producto -> Items
 */
Purchase.hasMany(PurchaseItem, { foreignKey: 'purchaseId', as: 'items' });
PurchaseItem.belongsTo(Purchase, { foreignKey: 'purchaseId' });

Product.hasMany(PurchaseItem, { foreignKey: 'productId', as: 'purchaseItems' });
PurchaseItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

/**
 * -----------------------------
 * Relaciones de Ventas
 * -----------------------------
 */

/**
 * @api {relation} User->Sale Relación Usuario -> Ventas
 * @apiDescription Un usuario puede tener muchas ventas (1:N)
 */
User.hasMany(Sale, { foreignKey: 'userId', as: 'sales' });
Sale.belongsTo(User, { foreignKey: 'userId', as: 'user' });

/**
 * @api {relation} Sale<->Product Relación Venta <-> Producto
 * @apiDescription Relación N:M entre ventas y productos a través de SaleItem
 */
Sale.belongsToMany(Product, { through: SaleItem, foreignKey: 'saleId', otherKey: 'productId', as: 'products' });
Product.belongsToMany(Sale, { through: SaleItem, foreignKey: 'productId', otherKey: 'saleId', as: 'sales' });

/**
 * Relación directa Venta -> Items y Producto -> Items
 */
Sale.hasMany(SaleItem, { foreignKey: 'saleId', as: 'items' });
SaleItem.belongsTo(Sale, { foreignKey: 'saleId' });

Product.hasMany(SaleItem, { foreignKey: 'productId', as: 'saleItems' });
SaleItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = { sequelize, User, Product, Purchase, PurchaseItem, Sale, SaleItem };
