
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(150), allowNull: false },
  role: { type: DataTypes.ENUM('ADMIN','CLIENT'), allowNull: false, defaultValue: 'CLIENT' }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;
