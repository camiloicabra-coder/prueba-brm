
const { sequelize } = require('../config/database');
const User = require('./user');
const Product = require('./product');
const Purchase = require('./purchase');
const PurchaseItem = require('./purchaseItem');
const Sale = require('./sale');
const SaleItem = require('./saleItem');

// Relaciones

// Usuario -> Compras (1:N)
User.hasMany(Purchase, { foreignKey: 'userId', as: 'purchases' });
Purchase.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Compras <-> Productos a través de PurchaseItem (N:M)
Purchase.belongsToMany(Product, { through: PurchaseItem, foreignKey: 'purchaseId', otherKey: 'productId', as: 'products' });
Product.belongsToMany(Purchase, { through: PurchaseItem, foreignKey: 'productId', otherKey: 'purchaseId', as: 'purchases' });

// Relación directa compra -> items y producto -> items
Purchase.hasMany(PurchaseItem, { foreignKey: 'purchaseId', as: 'items' });
PurchaseItem.belongsTo(Purchase, { foreignKey: 'purchaseId' });

Product.hasMany(PurchaseItem, { foreignKey: 'productId', as: 'purchaseItems' });
PurchaseItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Relación de ventas

User.hasMany(Sale, { foreignKey: 'userId', as: 'sales' });
Sale.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Ventas <-> Productos (N:M) a través de SaleItem
Sale.belongsToMany(Product, {
  through: SaleItem,
  foreignKey: 'saleId',
  otherKey: 'productId',
  as: 'products'
});

Product.belongsToMany(Sale, {
  through: SaleItem,
  foreignKey: 'productId',
  otherKey: 'saleId',
  as: 'sales'
});

// Relación directa Venta -> Items y Producto -> Items
Sale.hasMany(SaleItem, { foreignKey: 'saleId', as: 'items' });
SaleItem.belongsTo(Sale, { foreignKey: 'saleId' });

Product.hasMany(SaleItem, { foreignKey: 'productId', as: 'saleItems' });
SaleItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = { sequelize, User, Product, Purchase, PurchaseItem, Sale, SaleItem };
