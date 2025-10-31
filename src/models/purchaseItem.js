
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Product = require('./product');
const Purchase = require('./purchase');

const PurchaseItem = sequelize.define('PurchaseItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  subtotal: { 
    type: DataTypes.DECIMAL(10,2), 
    allowNull: false,
    defaultValue: 0 
  }
}, {
  tableName: 'purchase_items',
  timestamps: false
});

// relaciones
PurchaseItem.belongsTo(Product, { foreignKey: 'productId', as: 'producto' });
PurchaseItem.belongsTo(Purchase, { foreignKey: 'purchaseId', as: 'compra' });

module.exports = PurchaseItem;
