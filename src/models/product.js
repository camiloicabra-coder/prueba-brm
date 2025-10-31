// src/models/product.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  lote: { type: DataTypes.STRING(100), allowNull: false },
  name: { type: DataTypes.STRING(150), allowNull: false },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  entryDate: { type: DataTypes.DATEONLY, allowNull: false }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;
