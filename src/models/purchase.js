
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user'); // relación con usuario

const Purchase = sequelize.define('Purchase', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  total: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  tableName: 'purchases',
  timestamps: true
});

// relación: una compra pertenece a un usuario
//Purchase.belongsTo(User, { foreignKey: 'userId', as: 'cliente' });

module.exports = Purchase;
